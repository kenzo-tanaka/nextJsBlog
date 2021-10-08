---
title: 'ransackable_scopesを使った検索でdate_fieldを使うとエラーになる'
date: '2021-10-07'
category: 'dev'
---

Railsアプリでの検索機能を実装できる[Ransack](https://github.com/activerecord-hackery/ransack)というGemがあります。

Ransackでは引数を受け取るscopeを定義してそれを検索で使うことができます。`ransackable_scopes`という機能を使います。  
[ransack - Using Scopes/Class Methods](https://github.com/activerecord-hackery/ransack#using-scopesclass-methods)

この`ransackable_scopes`と`ActionView::Helpers::FormHelper#date_field`を併用するとエラーになる事象があったので、それに関するメモです。

Issueを作ったので、ほぼそれのコピペです。  

[NoMethodError error when using `ransackable_scopes` and `date_field` · Issue #1252 · activerecord-hackery/ransack](https://github.com/activerecord-hackery/ransack/issues/1252)

## バージョン

- ransack 2.4.2
- Rails 6.1.4
- Ruby 2.6.3

## 再現手順

```rb:article.rb
class Article < ApplicationRecord
  scope :created_since, -> (date) {
    where('created_at >= ?', date)
  }

  def self.ransackable_scopes(auth_object = nil)
    %i[created_since]
  end
end
```

```rb:search_controller.rb
class SearchController < ApplicationController
  def index
    @q = Article.ransack(params[:q])
  end
end
```

```slim:search/index.html.slim
= search_form_for @q, url: search_index_path do |form|
  = form.date_field :created_since
  = form.submit 'Search'
```

検索を実行する(検索フォームをサブミット)と下記のエラーとなります。

```shell
undefined method `strftime' for "2021-09-25":String
Did you mean?  strip
```

ちなみに`ransackable_scopes`を介さない検索であれば、上記のようなエラーは発生しません。

## 解決策

シンプルに`search_field`を使えば解決します。

```slim
= form.search_field :created_since, type: 'date'
```

## Ransackの中の処理

`ransackable_scopes`を介さない検索であればエラーにならないところが謎だったので、Ransackの処理を追ってみました。

`ransackable_scopes`ではない普通の検索であれば、`Condition#value`から`Value#cast`が呼ばれて、検索時の value をよしなにキャストしてくれます。

```rb:lib/ransack/nodes/condition.rb
def value
  if predicate.wants_array
    values.map { |v| v.cast(default_type) }
  else
    values.first.cast(default_type)
  end
end
```


```rb:lib/ransack/nodes/value.rb
def cast(type)
  case type
  when :date
    cast_to_date(value)
  when :datetime, :timestamp, :time
    cast_to_time(value)
  when :boolean
    cast_to_boolean(value)
  when :integer
    cast_to_integer(value)
  when :float
    cast_to_float(value)
  when :decimal
    cast_to_decimal(value)
  when :money
    cast_to_money(value)
  else
    cast_to_string(value)
  end
end
```

`ransackable_scopes`の場合は上記処理を通過しないので、キャストされずに文字列のまま`strftime`を呼び出そうとしてエラーになっているようです。

```rb:action_view/helpers/tags/date_field.rb
module ActionView
  module Helpers
    module Tags # :nodoc:
      class DateField < DatetimeField # :nodoc:
        private
          def format_date(value)
            value&.strftime("%Y-%m-%d") # 👈 エラーとなる箇所
          end
      end
    end
  end
end
```

`search_field`を使うと上記処理は通らないのでエラーになりません。
