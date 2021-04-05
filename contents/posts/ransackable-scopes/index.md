---
title: "ransackable_scopesを使う際の注意点"
date: "2021-04-05"
category: "dev"
---

Rails で検索を実装する際に、Ransack を使用することはよくあると思います。
[activerecord-hackery/ransack: Object-based searching.](https://github.com/activerecord-hackery/ransack)

通常の部分一致の検索やアソシエーションからの検索などは用意にできますが、より複雑な検索機能を実装したい際には、`ransackable_scopes`が便利です。

## ransackable_scopes

通常の Ransack の検索では実現できないような複雑なロジックを含んだ検索をできるようにする機能です。使い方は以下のような感じで、scope を用意しておいて、それを`self.ransackable_scopes`に仕込んでおきます。

```rb:product.rb
class Product < ActiveRecord::Base
  scope :by_complex_logic, -> (arg) {
    # 複雑なロジック
  }

  def self.ransackable_scopes(auth_object = nil)
    %i[by_complex_logic]
  end
end
```

```rb
Product.search(by_complex_logic: 'hoge').result
```

view 側で使う際には、普通の Ransack の検索と同じように第一引数に渡して上げる形で動作します。

```slim:index.html.slim
= f.select :by_complex_logic, ...
```

## ransackable_scopes の注意点

注意しないといけないのは、ransackable_scopes で定義したスコープに対して引数で`1`を渡すと`true`に変換されるため、エラーになります。
同じような理由で`0`が渡されたときは`false`に変換されて、エラーになります。

```shell
ArgumentError wrong number of arguments (given 0, expected 1)
```

なので id など数値の引数を期待する scope を定義して ransackable_scopes で使おうとすると、id=1 のときだけ検索できないみたいなことになります。  
このサニタイズを Ransack の検索全てから剥がしたい場合は、以下の設定を追加します。

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
