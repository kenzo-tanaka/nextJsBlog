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

パッと見で、なぜこれで想定する挙動になるのかが理解できなかったので、`rails c`から挙動の違いを追ってみます。

まず `:price` で指定した場合は、SQL の SUM 関数の中で `DISTINCT "products"."price"` されていることが分かります。

### コンソールで実行してみる

```shell
[6] pry(main)> Product.all.distinct.sum(:price)
   (14.0ms)  SELECT SUM(DISTINCT "products"."price") FROM "products"
=> 10000
```

次にブロックを渡した場合です。`products`テーブルの中で、`distinct` のものが選択されていて、たしかに今回想定するような挙動になっていることを確認できます。

```shell
[7] pry(main)> Product.all.distinct.sum(&:price)
  Product Load (2.4ms)  SELECT DISTINCT "products".* FROM "products"
=> 50000
```

### ソースコードを見る

`sum` の定義場所を探します。

```shell
[1] pry(main)> Product.all.distinct.method(:sum).source_location
=> ["/Users/macpc/.rbenv/versions/2.6.5/lib/ruby/gems/2.6.0/gems/activerecord-6.0.3.4/lib/active_record/relation/calculations.rb", 84]
```

参考: [Ruby でメソッドの定義場所を見つける方法 - Qiita](https://qiita.com/jnchito/items/fc8a61b421d026a23ffe)

コピーしてきたコードに、インラインでコメントを追記しました。

```rb:rails/activerecord/lib/active_record/relation/calculations.rb
def sum(column_name = nil)
  if block_given?
    unless column_name.nil?
      raise ArgumentError, "Column name argument is not supported when a block is passed."
    end

    # （1）
    super()
  else

    # （2）
    calculate(:sum, column_name)
  end
end
```

（1）ブロックが渡された場合はオーバーライドしているメソッドを呼び出しています。  
（2）ブロックが渡されなかった場合は、計算をそのまま実行しています。

コードの場所: [rails/calculations.rb](https://github.com/rails/rails/blob/bddb2c9b193c976dbe6a9a1358479d1792931986/activerecord/lib/active_record/relation/calculations.rb#L86-L96)

（1）で呼び出される `Enumerable#sum` では ブロックを `map` したあとに `sum` するので、`SELECT DISTINCT "products".* FROM "products"` が先に走った後合計の算出がされます。

```rb:rails/activesupport/lib/active_support/core_ext/enumerable.rb
def sum(identity = nil, &block)
  if identity
    _original_sum_with_required_identity(identity, &block)
  elsif block_given?
    # map して sum する
    map(&block).sum(identity)
  else
    inject(:+) || 0
  end
end
```

参照: [rails/enumerable.rb](https://github.com/rails/rails/blob/9cb09411e174ef7f71c6c986a50e5b839ebeab50/activesupport/lib/active_support/core_ext/enumerable.rb#L37-L45)

という具合です。勉強になりました。

(記事に誤りがあった場合は、下記の「Edit on GitHub」から修正を送ってもらえると嬉しいです)
