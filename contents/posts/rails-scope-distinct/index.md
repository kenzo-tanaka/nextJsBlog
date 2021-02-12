---
title: 【Rails】distinct を使った合計値の計算で意図しない値を返す挙動について
date: "2021-02-12"
category: "dev"
---

Rails で開発をしている中で、合計値を計算する scope が意図しない値を返すバグを経験しました。
`distinct` を使っているとこういった挙動が発生するようで、今後も遭遇しそうなのでメモを残しておきます。

[ActiveRecord distinct with sum produces unexpected results](https://github.com/rails/rails/issues/33082)

## 概要

```rb
Product.create(price: 100)
Product.create(price: 200)
Product.create(price: 100)

total = Product.distinct.sum(:price) # return 300
```

ここでは合計値として `400` を期待していますが、結果 `300` を返します。
