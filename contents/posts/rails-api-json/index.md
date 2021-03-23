---
title: Rails APIモードでレスポンスのハッシュに任意の値を持たせる
date: "2021-03-21"
category: "dev"
---

Rails API の開発で attributes 以外に定義したメソッドの値もレスポンスに含めたい時、`as_json`や`to_json`で `methods` オプションを指定することで実装できます。

```rb
user.as_json(methods: :permalink)
# => { "id" => 1, "name" => "Konata Izumi", "age" => 16,
#      "created_at" => "2006-08-01T17:27:13.000Z", "awesome" => true,
#      "permalink" => "1-konata-izumi" }
```

`as_json`と`to_json`は指定できるオプションなどは同じで違いがわかりにくかったので、今回はその辺りをまとめてみます。

## as_json, to_json の違い

- `as_json`: Hash を返す
- `to_json`: String を返す

```shell
> User.first.as_json
=> Hash
> User.first.to_json
=> String
```

`to_json` が定義されているところはこの辺り。

```rb
module ActiveSupport
  module ToJsonWithActiveSupportEncoder # :nodoc:
    def to_json(options = nil)
      if options.is_a?(::JSON::State)
        # Called from JSON.{generate,dump}, forward it to JSON gem's to_json
        super(options)
      else
        # to_json is being invoked directly, use ActiveSupport's encoder
        ActiveSupport::JSON.encode(self, options)
      end
    end
  end
```

`ActiveSupport::JSON.encode(self, options)`で処理されていることが分かったので、次はその処理を見てみる。
以下のメソッドが定義されている。コメントアウトで書かれている例が String に変換していることが分かる。

```rb
# Dumps objects in JSON (JavaScript Object Notation).
# See http://www.json.org for more info.
#
#   ActiveSupport::JSON.encode({ team: 'rails', players: '36' })
#   # => "{\"team\":\"rails\",\"players\":\"36\"}"
def self.encode(value, options = nil)
  Encoding.json_encoder.new(options).encode(value)
end
```

```rb
def encode(value)
  stringify jsonify value.as_json(options.dup)
end
```

`render json`で指定したときの動きを調べる。動かしてた感じだと`to_json`でもハッシュの配列になっていたけれど、それは何でなのか。

## やりたいこと

API のレスポンスを以下のような構造にしたい。

```json
// dataに配列が入っている構造
{
  "data": [
    {
      "id": 1,
      "body": "Go言語の本を読む",
      "category_name": "勉強"
    },
    {
      "id": 2,
      "body": "Ruby on RailsでAPI開発",
      "category_name": "勉強"
    },
    {
      "id": 3,
      "body": "Djangoを触ってみる",
      "category_name": "勉強"
    }
  ]
}
```

## 事象

まずはシンプルに実装してみる。

```rb
def index
  render json: { data: Idea.order(:id) }
end
```

問題なく出力されていることを確認。

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

ここでカテゴリーの ID ではなくカテゴリー名をレスポンスに含めたいとする。`to_json`がオプションとして用意している、`methods`を使ってみる。

```rb
def index
  render json: { data: Idea.order(:id).to_json(methods: [:category_name]) }
end
```

しかしこうすると出力が以下のように data の値が文字列になってしまう。

```json
// curl localhost:3000 | json_pp
{
  "data": "[{\"id\":1,\"body\":\"Go言語の本を読む\",\"category_id\":1,\"created_at\":\"2021-03-20T02:33:36.893Z\",\"updated_at\":\"2021-03-20T02:33:36.893Z\",\"category_name\":\"勉強\"}, ...]"
}
```

ちなみに以下は Pretty Print される。

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

> 出力するオブジェクトに対して to_json を呼び出す必要はありません。:json オプションが指定されていれば、render によって to_json が自動的に呼び出されるようになっています。  
> Rails ガイド

`render json`に渡す値は明示的に `to_json` する必要はないが、`to_json`で文字列に変換されていてもよしなに実行してくれる。

```rb
def index
  render json: { data: Idea.order(:id).to_json(methods: [:category_name]) }
end
```

このコードの場合 `{ data: 'to_jsonによって生成された文字列' }` という Hash が渡されたことになるので、整形してくれない。
