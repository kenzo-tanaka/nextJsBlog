---
title: 'ransackable_scopesを使った検索でdate_fieldを使うとエラーになる'
date: '2021-10-07'
category: 'dev'
---

Railsアプリでの検索機能を実装できる[Ransack](https://github.com/activerecord-hackery/ransack)というGemがあります。

Ransackでは引数を受け取るscopeを定義してそれを検索で使うことができます。`ransackable_scopes`という機能を使います。  
[ransack - Using Scopes/Class Methods](https://github.com/activerecord-hackery/ransack#using-scopesclass-methods)


