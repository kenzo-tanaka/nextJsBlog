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
