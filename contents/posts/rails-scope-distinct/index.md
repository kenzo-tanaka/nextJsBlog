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

Issue の作者は `400` を期待していますが、このコードは `300` を返します。  
`distinct` は対象カラムの中でユニークなものだけをまとめるので、`[100, 200, 100]` → `[100, 200]` となりその合計として 300 を返しているという挙動です。

`join` や `includes` をした末、`sum` で合計値を出したい時に `distinct` を使うのは自然な発想です。  
一方で「`distinct` はユニークなやつだけまとめるのだから、バグではないよね」という[意見](https://github.com/rails/rails/issues/33082#issuecomment-395998491)もよく分かるなあと思いました。

## 対応

kamipo さんの[コメント](https://github.com/rails/rails/issues/33082#issuecomment-395999611)にあった対応方法です。

```rb
Product.distinct.sum(&:price)
```
