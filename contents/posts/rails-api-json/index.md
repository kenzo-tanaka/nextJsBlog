---
title: Rails APIモードでレスポンスのハッシュに任意の値を持たせつつネストさせたい時の注意点
date: "2021-03-21"
category: "dev"
---

## やりたいこと

- Rails API の開発でインスタンスメソッドの返り値もレスポンスに含めたい
- レスポンスのデータは以下のようにネストしたハッシュにしたい

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

`as_json`や`to_json`で `methods` オプションを指定することで「インスタンスメソッドの返り値もレスポンスに含めたい」は実装できます。

```rb
user.as_json(methods: :permalink)
# => { "id" => 1, "name" => "Konata Izumi", "age" => 16,
#      "created_at" => "2006-08-01T17:27:13.000Z", "awesome" => true,
#      "permalink" => "1-konata-izumi" }
```

### `as_json` と `to_json` の違い

- `as_json`: Hash を返す
- `to_json`: String を返す

```shell
> User.first.as_json
=> Hash
> User.first.to_json
=> String
```

`render json`で指定したときの動きを調べる。動かしてた感じだと`to_json`でもハッシュの配列になっていたけれど、それは何でなのか。

## 事象

まずは`to_json`を使わず、シンプルな実装をしてみます。

```rb
def index
  render json: { data: Idea.order(:id) }
end
```

問題なく出力されていることを確認します。

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

ここで`to_json`がオプションとして用意している、`methods`を使ってみます。

```rb
def index
  render json: { data: Idea.order(:id).to_json(methods: [:category_name]) }
end
```

しかし、こうすると出力が以下のように data の値が文字列になってしまっていることが分かります。

```json
// curl localhost:3000 | json_pp
{
  "data": "[{\"id\":1,\"body\":\"Go言語の本を読む\",\"category_id\":1,\"created_at\":\"2021-03-20T02:33:36.893Z\",\"updated_at\":\"2021-03-20T02:33:36.893Z\",\"category_name\":\"勉強\"}, ...]"
}
```

> 出力するオブジェクトに対して to_json を呼び出す必要はありません。:json オプションが指定されていれば、render によって to_json が自動的に呼び出されるようになっています。  
> [レイアウトとレンダリング - Rails ガイド](https://railsguides.jp/layouts_and_rendering.html)

`render json`に渡す値は明示的に `to_json` する必要はないが、`to_json`で文字列に変換されていてもよしなに実行してくれる。

`to_json`を使いつつ、`data`の構造を剥がしてみます。

```rb
def index
  render json: Idea.order(:id).to_json
end
```

```json
// $ curl localhost:3000 | json_pp を実行
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

`render json` に `to_json`した文字列を渡してもよしなにやってくれています。

```rb
def index
  render json: { data: Idea.order(:id).to_json(methods: [:category_name]) }
end
```

しかしこのコードの場合 `{ data: 'to_jsonによって生成された文字列' }` という Hash が渡されたことになるので、整形してくれません。
なのでこの場合は `as_json` を使う必要があります。

```rb
def index
  render json: { data: Idea.order(:id).as_json(methods: [:category_name]) }
end
```

こうすと `data` のバリューは`as_json`によって生成されたハッシュの配列になるので想定する結果を得られます。
