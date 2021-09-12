---
title: 'Rails7の情報を追いかける'
date: '2021-09-12'
category: 'dev'
---

最近DHH本人がRails7について語る動画や記事をよく見かけるようになったので、内容を追ってみたメモです。

- [Rails 7 will have three great answers to JavaScript in 2021+](https://world.hey.com/dhh/rails-7-will-have-three-great-answers-to-javascript-in-2021-8d68191b)
- [Modern web apps without JavaScript bundling or transpiling](https://world.hey.com/dhh/modern-web-apps-without-javascript-bundling-or-transpiling-a20f2755)
- [Alpha preview: Modern JavaScript in Rails 7 without Webpack - YouTube](https://www.youtube.com/watch?v=PtxZvFnL2i0)

## ざっくり概要

- Rails7ではWebpacker, Turoblinks, UJSをやめてimport map,  Stimulus, Hotwireに置き換える
- APIモードは引き続き使える

## おさらい

`Webpacker`  
webpackをRailsで使えるようにしたラッパー。JavaScript, CSS, 画像などの静的ファイルを管理できる。

Sprocketsとの違いはNPMパッケージとの統合に優れている点。

[Webpacker の概要 - Railsガイド](https://railsguides.jp/webpacker.html)


`Turbolinks`  
Railsに同梱されているライブラリでAjaxの動きを実現している。`<a>`タグに対してクリックハンドラが追加される。
リンクをクリックした際は`<body>`全体をレスポンスの`<body>`に置換する。

[Rails で JavaScript を使用する - Railsガイド](https://railsguides.jp/working_with_javascript_in_rails.html#turbolinks)

このブログでも書いたことがありますが、Turbolinksが原因で意図しない挙動になることはよくあって、あまり好いている人はいない印象です..

[Railsアプリケーションでscroll-behaviorが正常に動作しない場合の対処](https://kenzoblog.vercel.app/posts/rails-anchor-link)


