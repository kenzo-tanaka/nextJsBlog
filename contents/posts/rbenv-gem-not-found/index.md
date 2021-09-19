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

[Rubyで型チェック！動かして理解するRBS入門 〜サンプルコードでわかる！Ruby 3.0の主な新機能と変更点 Part 1〜 - Qiita](https://qiita.com/jnchito/items/bf8c6c2e1dd6cff05f4e)

こちらの記事を参考にコードを書いていく。途中`typeprof`などが必要なので、インストールして実行しようとするが`command not found`のエラーとなる。

```shell
$ gem install typeprof
$ typeprof xxx.rb
zsh: command not found: typeprof
```

## 対応

結論としては、`rbenv rehash`を実行する必要があった。また`rbenv rehash`実行にあたり、下記エラーが発生したため、`.rbenv-shim`を削除する対応をとった。

```shell
rbenv: cannot rehash: /usr/local/var/rbenv/shims/.rbenv-shim exists
```
