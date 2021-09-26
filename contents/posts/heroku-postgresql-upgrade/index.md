---
title: 'Heroku Postgres をアップグレードする手順'
date: '2021-09-26'
category: 'dev'
---

Heroku Postgres を Hobby Dev から有料プランにアップグレードする機会があり、色々選択肢がある中で迷い調べた内容のメモです。

## 結論

Hobby層をアップグレードするには、`pg:copy`を使ってアップグレードを行います。手順は下記に記載されているとおりです。  
[Heroku Postgres データベースのバージョンのアップグレード | Heroku Dev Center](https://devcenter.heroku.com/ja/articles/upgrading-heroku-postgres-databases#upgrading-with-pg-copy)

## アップグレードの方法

Heroku Postgres をアップグレードする方法は以下の3つがあります。

- `​heroku addons:upgrade`
- ​フォロワーの切り替え
- `pg:copy`

[Heroku Postgres データベースのプランまたはインフラストラクチャの変更 | Heroku Dev Center](https://devcenter.heroku.com/ja/articles/updating-heroku-postgres-databases)

ただし、Hobby層(`hobby-dev​` と `hobby-basic`)からのアップグレードをするには、`pg:copy`を使うのが唯一の手段です。

> pg:copy​ コマンドでは、サポートされているすべての Heroku Postgres プランおよびバージョン間での更新がサポートされます。さらに、これは Hobby 層​のデータベースに関連する更新 (このデータベースとの間のすべての移行) のためにサポートされている唯一の方法です。
> [pg:copyの更新 - Heroku Postgres データベースのプランまたはインフラストラクチャの変更 | Heroku Dev Center](https://devcenter.heroku.com/ja/articles/updating-heroku-postgres-databases#updating-with-pg-copy)

## `pg:copy`でアップグレードしていく

アップグレードしたいプランでDBを新しく用意し、`pg:copy`で既存DBのレコードを移行する方法。  
**途中アプリをメンテナンスモードにする必要がある**ので、適切なタイミングを見計らってやる必要がある。

1. 新しいプランのDBを用意する
  ```shell
  $ heroku addons:create heroku-postgresql:standard-0 --app hoge
  ```
  この時点で Heroku Postgres が既存と新規で2種類アタッチされた状態となる。新しい方に既存のデータを移行していく。

  ```shell
  $ heroku pg:wait --app hoge
  # プロビジョニングが完了するまでローディング状態となり
  # プロビジョニングが完了したら available と表示される
  ```
2. アプリをメンテナンスモードにする
  ```shell
  # アプリをメンテナンスモードにする
  # 利用者はアプリにアクセス出来ない状態となり、DBが書き換わるのを防ぐ
  $ heroku maintenance:on --app hoge
  ```
