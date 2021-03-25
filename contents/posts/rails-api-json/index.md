---
title: Rails APIモードでレスポンスのハッシュに任意の値を持たせつつネストさせたい時の注意点
date: "2021-03-21"
category: "dev"
---

## やりたいこと

- テーブルのカラム以外にインスタンスメソッドの返り値もレスポンスに含めたい
- レスポンスのデータはネストした構造にしたい

```json
// GET: /api/v1/ideas のレスポンス
{
  // dataに配列が入っている構造
  "data": [
    {
      "id": 1,
      "body": "Go言語の本を読む",
      // これが idea.rb に定義したメソッドの返り値と想定
      "category_name": "勉強"
    }
    // ...
  ]
}
```

## 前提知識

### `as_json` と `to_json`

`as_json` や `to_json` を使うと `ActiveRecord_Relation` を Hash の配列に変換できます。用意されているオプションなどはほぼ同じなのですが、`as_json` と `to_json` には以下のような違いがあります。

- `as_json`: Hash を返す
- `to_json`: String を返す

```shell
> User.first.as_json
=> Hash
> User.first.to_json
=> String
```

`methods` オプションを指定することで「インスタンスメソッドの返り値もレスポンスに含めたい」の要件は実装できます。

```rb
user.as_json(methods: :permalink)
# => { "id" => 1, "name" => "Konata Izumi", "age" => 16,
#      "created_at" => "2006-08-01T17:27:13.000Z", "awesome" => true,
#      "permalink" => "1-konata-izumi" }
```

[ActiveModel::Serializers::JSON](https://api.rubyonrails.org/v6.0.3.3/classes/ActiveModel/Serializers/JSON.html)

## to_json で実装しているとぶつかる壁

まずは`to_json`を使わず、シンプルな実装をしてみます。この実装ではまずレスポンスのデータが想定している構造で問題なく出力されます。

```rb
def index
  render json: { data: Idea.order(:id) }
end
```

```json
// curl localhost:3000 | json_pp を実行
{
  "data": [
    {
      "body": "Go言語の本を読む",
      "id": 1,
      "created_at": "2021-03-20T02:33:36.893Z",
      "category_id": 1,
      "updated_at": "2021-03-20T02:33:36.893Z"
    },
    {
      "created_at": "2021-03-20T02:33:36.916Z",
      "category_id": 1,
      "updated_at": "2021-03-20T02:33:36.916Z",
      "body": "Ruby on RailsでAPI開発",
      "id": 2
    }
  ]
}
```

上記では`to_json`を呼び出していませんが、`Idea.order(:id)`を Rails がよしなにハッシュの配列に変換してくれています。

> 出力するオブジェクトに対して to_json を呼び出す必要はありません。:json オプションが指定されていれば、render によって to_json が自動的に呼び出されるようになっています。  
> [レイアウトとレンダリング - Rails ガイド](https://railsguides.jp/layouts_and_rendering.html)

「テーブルのカラム以外にインスタンスメソッドの返り値もレスポンスに含めたい」の要件を実装するため`to_json`がオプションとして用意している、`methods`を使ってみます。しかし、下記の実装では data の値が文字列になってしまいます。

```rb
def index
  render json: { data: Idea.order(:id).to_json(methods: [:category_name]) }
end
```

```json
// curl localhost:3000 | json_pp
{
  "data": "[{\"id\":1,\"body\":\"Go言語の本を読む\",\"category_id\":1,\"created_at\":\"2021-03-20T02:33:36.893Z\",\"updated_at\":\"2021-03-20T02:33:36.893Z\",\"category_name\":\"勉強\"}, ...]"
}
```

## 原因

状況を整理するため、data のネストを剥がして、methods オプションなしで`to_json`を使ってみます。こうすると、先程のような文字列にはならず綺麗に整形されたデータを返します。

```rb
def index
  render json: Idea.order(:id).to_json
end
```

```json
// curl localhost:3000 | json_pp
[
  {
    "id": 1,
    "body": "Go言語の本を読む",
    "category_id": 1,
    "created_at": "2021-03-20T02:33:36.893Z",
    "updated_at": "2021-03-20T02:33:36.893Z"
  },
  {
    "body": "Ruby on RailsでAPI開発",
    "id": 2,
    "created_at": "2021-03-20T02:33:36.916Z",
    "updated_at": "2021-03-20T02:33:36.916Z",
    "category_id": 1
  }
]
```

`json`に Hash が渡された時の挙動も確かめてみます。

```rb
def index
  render json: { data: 'hoge' }
end
```

```json
{
  "data": "hoge"
}
```

なので状況を整理すると、以下のようになります。

- `json`で指定するオブジェクトに対して`to_json`を呼び出す必要はない
- `json`で指定するオブジェクトが`to_json`されて文字列の場合、それを整形して返す
- `json`で指定するオブジェクトが Hash の場合は、それをそのまま返す

先程のこのコードの場合 `{ data: 'to_jsonによって生成された文字列' }` という Hash が渡されたことになるので、整形してくれません。

```rb
def index
  render json: { data: Idea.order(:id).to_json(methods: [:category_name]) }
end
```

## 解決策

今回の場合は `as_json` を使って Hash の配列を data に渡す必要があります。

```rb
def index
  render json: { data: Idea.order(:id).as_json(methods: [:category_name]) }
end
```
