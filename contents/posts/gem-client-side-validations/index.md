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

あとは、Rails の`form_for`などに`validate: true`を付与するだけ。

```slim:_form.html.slim
= form_for @article, validate: true do |f|
```
