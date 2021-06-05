---
title: "gem client_side_validationsを試してみた。"
date: "2021-06-05"
category: "dev"
---

GitHub のメルマガで流れてきて知った Gem[DavyJonesLocker/client_side_validations](https://github.com/DavyJonesLocker/client_side_validations)を試してみた。

## Gem の紹介

[DavyJonesLocker/client_side_validations](https://github.com/DavyJonesLocker/client_side_validations)

バックエンドではなく、クライアント側でフォームにバリデーションをかけたい時に使える Gem。Email のフォーマットなど複雑なバリデーションをかけたいときなどに使えそう。スターも 2021/06 現在で 2.5k ついている。README を見る限りではセットアップも簡単そう。

## セットアップ

```rb:Gemfile
gem 'client_side_validations'
```

```shell
bundle install
```

```shell
# 設定ファイルを作成
rails g client_side_validations:install
```

```shell
# npmパッケージをインストール
yarn add @client-side-validations/simple-form
```

```js:application.js
require('@client-side-validations/client-side-validations');
```

```rb:article.rb
class Article < ApplicationRecord
  validates :title, presence: true, uniqueness: true
end
```

あとは、Rails の`form_for`などに`validate: true`を付与するだけ。

```slim:_form.html.slim
= form_for @article, validate: true do |f|
```

フォームをサブミットするか・エラーのある状態で次の入力に移ろうとすると、JS でバリデーションを検知してくれるようになる。下記は`scaffolds.scss`以外スタイルを入れていないので、input が赤くなるだけ。

![](img1.png)

## SimpleForm を使う

README で紹介されていたプラグイン SimpleForm を導入してみる。

```rb:Gemfile
gem 'simple_form'
gem 'client_side_validations'
gem 'client_side_validations-simple_form'
```

上記順番に気をつけること。`client_side_validations`は`client_side_validations-simple_form`よりも前じゃないといけない。

```shell
yarn add @client-side-validations/simple-form
```

```js:application.js
require('@client-side-validations/simple-form')
// Bootstrap 4+ with `require` syntax
require('@client-side-validations/simple-form/dist/simple-form.bootstrap4')
```

```slim:_form.html.slim
= simple_form_for @article, validate: true do |f|
```

バリデーションエラーメッセージの表示と、あまりイケてないスタイルが反映される。

![](img2.png)

バリデーションエラーのときに表示される HTML を変更するには、設定ファイルを書き換える。コメントアウトされているところをアンコメントしてみると少し表示位置が変わっていることを確認できる。

![](img3.png)

ついでに wiki に書いてあった設定も試してみた。画面右側にエラーメッセージを表示させている感じ。

![](img4.png)
