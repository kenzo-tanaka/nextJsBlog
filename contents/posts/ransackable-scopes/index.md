---
title: "ransackable_scopesを使う際の注意点"
date: "2021-04-10"
category: "dev"
---

Rails で検索を実装する際に、Ransack を使用することはよくあると思います。
[activerecord-hackery/ransack: Object-based searching.](https://github.com/activerecord-hackery/ransack)

通常の部分一致の検索やアソシエーションからの検索などは用意にできますが、より複雑な検索機能を実装したい際には、`ransackable_scopes`が便利です。
[ransack - Using Scopes/Class Methods](https://github.com/activerecord-hackery/ransack#using-scopesclass-methods)

## ransackable_scopes

通常の Ransack の検索では実現できないような複雑なロジックを含んだ検索をできるようにする機能です。使い方は以下のような感じで、scope を用意しておいて、それを`self.ransackable_scopes`に仕込んでおきます。

```rb:product.rb
class Product < ActiveRecord::Base
  scope :by_complex_logic, -> (id) {
    # 複雑なロジック
  }

  def self.ransackable_scopes(auth_object = nil)
    %i[by_complex_logic]
  end
end
```

```rb
Product.search(by_complex_logic: 3).result
```

view 側で使う際には、普通の Ransack の検索と同じように第一引数に渡して上げる形で動作します。

```slim:index.html.slim
= f.select :by_complex_logic, ...
```

## ransackable_scopes の注意点

- ransackable_scopes で定義したスコープに対して真偽値を渡すと「そのスコープによる絞り込みを実行するかの判定」に使用される
- ransackable_scopes で定義したスコープに対して引数で`1`を渡すと`true`に変換される

### ransackable_scopes で定義したスコープに対して真偽値を渡すと「そのスコープによる絞り込みを実行するかの判定」に使用される

引数を持たない自前の ransackable_scopes を実行する時は、`1`や`true`を渡します。  
逆に実行しないときは、`0`や`false`を渡します。

```shell
Product.search(no_arg_scope: true).result
Product.search(no_arg_scope: 1).result
# -> no_arg_scopeによる絞り込みを実行した結果を返す
Product.search(no_arg_scope: false).result
Product.search(no_arg_scope: 0).result
# -> no_arg_scopeによる絞り込みを実行しない結果を返す
```

### ransackable_scopes で定義したスコープに対して引数で`1`を渡すと`true`に変換される

下記のように ID のような数値の引数を期待するスコープを用意していると、`id=1`のときだけ検索できないという事象が発生します。

```rb:product.rb
class Product < ActiveRecord::Base
  scope :by_complex_logic, -> (id) {
    # 数値の引数を期待
  }

  def self.ransackable_scopes(auth_object = nil)
    %i[by_complex_logic by_complex_logic_2]
  end
end
```

```shell
> Product.search(by_complex_logic: 1).result
ArgumentError wrong number of arguments (given 0, expected 1)
```

これは Ransack が 1→true に変換するからです。

> However, perhaps you have user_id: [1] and you do not want Ransack to convert 1 into a boolean.  
> [ransack - Using Scopes/Class Methods](https://github.com/activerecord-hackery/ransack#using-scopesclass-methods)

```shell
# つまりこれが実行されているのと同じ
> Product.search(by_complex_logic: true).result
```

なので「by_complex_logic による検索を実行する」という指定になっていて、引数をうまく渡せていないことになります。

## 解決策

この変換を Ransack の検索全てから剥がしたい場合は、以下の設定を追加します。

```rb:config/initializers/ransack.rb
Ransack.configure do |c|
  c.sanitize_custom_scope_booleans = false
end
```

部分的にサニタイズを剥がしたい場合は、以下のように設定します。

```rb:product.rb
class Product < ActiveRecord::Base
  scope :by_complex_logic, -> (arg) {
    # 複雑なロジック
  }

  def self.ransackable_scopes(auth_object = nil)
    %i[by_complex_logic]
  end

  # この設定を加えたscopeでは 1→true とかの変換をしなくなる
  def self.ransackable_scopes_skip_sanitize_args
    %i[by_complex_logic]
  end
end
```
