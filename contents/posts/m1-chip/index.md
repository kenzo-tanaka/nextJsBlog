---
title: 'M1を使い始めた。'
date: '2022-02-19'
category: 'dev'
---

仕事でM1チップのMacbookを使い始めたので、周辺知識をしらべてみたメモ。

## M1チップとは何か

初めてAppleが発表した省電力でパワフルなチップ。iPhone、iPadのARMアーキテクチャを採用している。  
[Apple、M1チップを発表 - Apple (日本)](https://www.apple.com/jp/newsroom/2020/11/apple-unleashes-m1/)

今まではIntel製のチップを使っていた。Core i3、Core i5、Core i7、Core i9などがあり、バージョンごとに性能が違う。
Intel社が1978年に発表したCPU命令セットのことをx86という。x86を64bitに拡張したものをx86_64という。

これらに対して、ARM社によって設計したARMアーキテクチャがある。グラフィック性能や機械学習の部分などを、メーカーが独自にカスタマイズできる。

[アップルの発表したAppleシリコンって一体なに？｜エイペックスレンタルズ-スタッフブログ](https://www.apex106.info/apple-sillicon-mac/)

## rbenv

`rbenv install` で落ちる。バージョンによって落ちたり、通ったりする。

```shell
uname -m
arm64
rbenv install 2.6.3

Downloading ruby-2.6.3.tar.bz2...
-> https://cache.ruby-lang.org/pub/ruby/2.6/ruby-2.6.3.tar.bz2
Installing ruby-2.6.3...

BUILD FAILED (macOS 12.0.1 using ruby-build 20220125)

Inspect or clean up the working tree at /var/folders/j2/vfdnhrkx25j3xdmyvpcly7pc0000gp/T/ruby-build.20220219174837.49150.1xTdpk
Results logged to /var/folders/j2/vfdnhrkx25j3xdmyvpcly7pc0000gp/T/ruby-build.20220219174837.49150.log
```

[Installation issues with Arm Mac (M1 Chip) · Issue #1691 · rbenv/ruby-build](https://github.com/rbenv/ruby-build/issues/1691)

```shell
RUBY_CFLAGS="-w" rbenv install 2.6.3
```