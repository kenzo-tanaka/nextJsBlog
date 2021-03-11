---
title: Railsでバッチファイルを書く時に気にしていること
date: "2021-03-11"
category: "dev"
---

Ruby on Rails の開発でバッチファイルを書く時気にしていることをまとめます。レビュー時によく指摘されることでもあるので、備忘録でもあります。

## `find_each` を使うもしくは `order` で並び順を指定する

例えば既存のテーブルと 1 対 1 で関連付く新しいテーブルを作ったとします。バッチ処理で既存レコードのデータをもとに新規のデータを作成したい場合、並び順も揃えたいです。

`all` で発行される SQL は並び順を指定していないので、実行した時に ID 順になっている保証がありません。
なので `each` ではなく、`find_each` を使うか `order` で順番を明示的に指定します。

コンソールから確認すると `find_each` は ID でソートしていることを確認できます。

```shell
# find_each はIDでソートしている
[1] pry(main)> User.find_each do end
  User Load (7.2ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT $1  [["LIMIT", 1000]]
=> nil
# all は明示的なソートをしていない
[2] pry(main)> User.all.to_sql
=> "SELECT \"users\".* FROM \"users\""
```

参考: [【Rails】開発環境とテストコード上（または本番環境）でデータの並び順が異なる場合の原因と対処方法 - Qiita](https://qiita.com/jnchito/items/90c28c3f3e856add0a82)

## `ActiveRecord::Base.transaction` を使う

バッチ処理では DB の値を操作することが多く、1 つのバッチ処理が途中で失敗して部分的にレコードが書き換わる状態は避ける必要があります。

`ActiveRecord::Base.transaction` を使うと処理途中で例外が発生した場合、処理全体をロールバックしてくれます。保存や更新に失敗した場合には、例外になってほしいのでブロック内では、`update!`や`save!`など `!` がつくメソッドを使用します。

```rb
ActiveRecord::Base.transaction do
  product = Product.first
  product.update!(price: 10000)
end
```

参考: [Rails の Transaction の使い方 - Qiita](https://qiita.com/huydx/items/d946970d130b7dabe7ec)

## 本番のデータをダウンロードしてバッチ処理を試す

開発環境やステージングで成功したバッチ処理でも、本番環境では失敗する可能性はあります。本番 DB に保存されている複雑なデータを考慮できていなかったなどが原因です。

これを避けるため本番データをローカルにダウンロードして、ローカルでバッチ処理を走らせます。
以下は Heroku のバックアップデータをダウンロードして、`pg_restore`で開発環境の DB に入れる手順です。

```shell
$ rails db:drop && rails db:create
# mydbにDB名、latest.dumpにDLしたデータのパス
$ pg_restore --verbose --clean --no-acl --no-owner -h localhost -d mydb latest.dump
$ # バッチ処理
$ rm latest.dump
```

参考: [Importing and Exporting Heroku Postgres Databases | Heroku Dev Center](https://devcenter.heroku.com/articles/heroku-postgres-import-export)
