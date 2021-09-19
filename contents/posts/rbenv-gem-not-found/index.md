---
title: 'rbenvでRubyバージョンを切り替え後インストールしたGemを実行できない'
date: '2021-09-19'
category: 'dev'
---

Ruby3の挙動を確かめるためrbenvでRubyのバージョンを切り替えたとき、インストールしたGemを実行できない事象があったので対応方法などをメモしておきます。

```shell
rbenv 1.1.2
```

## 事象の再現

普段はRuby2.7.3を使っている。Ruby3を試すために、任意のディレクトリで下記を実行。

```shell
$ rbenv local 3.0.2
$ ruby -v
ruby 3.0.2p107
```

型チェックのために`typeprof`などが必要なので、インストールして実行しようとするが`command not found`のエラーとなる。

```shell
$ gem install typeprof
$ typeprof xxx.rb
zsh: command not found: typeprof
```

## 対応

結論としては、`rbenv rehash`を実行する必要があった。また`rbenv rehash`実行にあたり、下記エラーが発生したため、`.rbenv-shim`を削除する対応をとった。

```shell
$ rbenv rehash
rbenv: cannot rehash: /usr/local/var/rbenv/shims/.rbenv-shim exists
$ cd /Users/xxx/.rbenv/shims
$ rm .rbenv-shim
$ rbenv rehash
```

rbenvの仕組みなどをちゃんと調べてこなかったので、以下ではrbenvの仕組みやrehashが何をしているのかについて調べた内容をメモしている。

## `Shims`とはなにか

公式のREADMEに記載がある。

[rbenv/rbenv: README](https://github.com/rbenv/rbenv)

- rbenvはPATHの先頭に`shims`のディレクトリを追加する
- インストールされた全てのバージョンのRubyコマンドにマッチするshimをディレクトリに維持する。
