---
title: Rails APIモードでレスポンスのハッシュに任意の値を持たせる
date: "2021-03-21"
category: "dev"
---

<!-- https://thoughtbot.com/blog/better-serialization-less-as-json -->
<!-- https://blog.shitake4.tech/entry/2018/02/13/Rails%E3%81%AE%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89%E8%AA%AD%E3%82%93%E3%81%A7%E3%81%BF%E3%82%8B_%7C_Active_Support_as_json%E7%B7%A8 -->

as_json, to_json の違い。

レシーバが`to_hash`を実行できる場合、`to_hash.as_json`してる。
`ActiveRecord_Relation`は `to_hash`を実行できない。

```rb
def as_json(options = nil) #:nodoc:
  if respond_to?(:to_hash)
    to_hash.as_json(options)
  else
    instance_values.as_json(options)
  end
end
```

[Active Model の基礎 - Rails ガイド](https://railsguides.jp/active_model_basics.html)
