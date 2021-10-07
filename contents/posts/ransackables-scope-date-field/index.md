---
title: 'ransackable_scopesを使った検索でdate_fieldを使うとエラーになる'
date: '2021-10-07'
category: 'dev'
---

Railsアプリでの検索機能を実装できる[Ransack](https://github.com/activerecord-hackery/ransack)というGemがあります。

Ransackでは引数を受け取るscopeを定義してそれを検索で使うことができます。`ransackable_scopes`という機能を使います。  
[ransack - Using Scopes/Class Methods](https://github.com/activerecord-hackery/ransack#using-scopesclass-methods)

この`ransackable_scopes`と`ActionView::Helpers::FormHelper#date_field`を併用するとエラーになる事象があったので、それに関するメモです。

## 再現

Issueを作ったので、ほぼそれのコピペです。  

[NoMethodError error when using `ransackable_scopes` and `date_field` · Issue #1252 · activerecord-hackery/ransack](https://github.com/activerecord-hackery/ransack/issues/1252)

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
