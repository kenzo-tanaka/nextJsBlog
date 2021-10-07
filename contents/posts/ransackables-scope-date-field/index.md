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

## なんで`search_field`で解決するか

```erb
<%# Not work %>
<%= form.date_field :created_since %>

<%# Work %>
<%= form.search_field :created_since, type: 'date' %>
```

吐き出されるHTMLは同じです。

```html
<input type="date" name="q[created_since]" id="q_created_since">
<input type="date" name="q[created_since]" id="q_created_since">
```

`date_field`の実装を見てみます。  
[date_field (ActionView::Helpers::FormHelper) - APIdock](https://apidock.com/rails/v6.0.0/ActionView/Helpers/FormHelper/date_field)

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

スーパークラスの`DatetimeField`を見てみます。

```rb:action_view/helpers/tags/datetime_field.rb
module ActionView
  module Helpers
    module Tags # :nodoc:
      class DatetimeField < TextField # :nodoc:
        def render
          options = @options.stringify_keys
          options["value"] ||= format_date(value) # 👈 format_dateがここで呼ばれている
          options["min"] = format_date(datetime_value(options["min"]))
          options["max"] = format_date(datetime_value(options["max"]))
          @options = options
          super
        end
      end
    end
  end
end
```
