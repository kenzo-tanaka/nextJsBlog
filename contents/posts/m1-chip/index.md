---
title: 'M1 Macでrbenv installで落ちる問題'
date: '2022-02-19'
category: 'dev'
---

M1チップのMacbookで環境構築している際、`rbenv install`で下記のようなエラーでコケることがある。それの解決策について。

```shell
rbenv install 2.6.3
Downloading ruby-2.6.3.tar.bz2...
-> https://cache.ruby-lang.org/pub/ruby/2.6/ruby-2.6.3.tar.bz2
Installing ruby-2.6.3...

BUILD FAILED (macOS 12.0.1 using ruby-build 20220125)

Inspect or clean up the working tree at /var/folders/j2/vfdnhrkx25j3xdmyvpcly7pc0000gp/T/ruby-build.20220219174837.49150.1xTdpk
Results logged to /var/folders/j2/vfdnhrkx25j3xdmyvpcly7pc0000gp/T/ruby-build.20220219174837.49150.log
```

## 結論

まさに同じところでコケているIssueがruby-buildに上がっていた。 
[Installation issues with Arm Mac (M1 Chip) · Issue #1691 · rbenv/ruby-build](https://github.com/rbenv/ruby-build/issues/1691)

`RUBY_CFLAGS="-w"`を設定すると、インストールは通るようになる。

```shell
RUBY_CFLAGS="-w" rbenv install 2.6.3
```

2.7.2など、バージョンによって上記のエラーが発生しないこともある。

```shell
rbenv install 2.7.2
Downloading ruby-2.7.2.tar.bz2...
-> https://cache.ruby-lang.org/pub/ruby/2.7/ruby-2.7.2.tar.bz2
Installing ruby-2.7.2...
ruby-build: using readline from homebrew
Installed ruby-2.7.2 to /Users/ben/.rbenv/versions/2.7.2
```