---
title: 'Rails7の情報を追いかけてみたメモ'
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

## Import mapsとは

Rails7について調べている中ではじめて知りました😅

- [WICG/import-maps: How to control the behavior of JavaScript imports](https://github.com/WICG/import-maps)
- [Import mapsでDenoのパッケージのバージョンを管理したい | WEB EGG](https://blog.leko.jp/post/package-management-in-deno-with-import-map/)

import文とそれに対応するURLをコントロールする仕様。これを使うと論理的な名前指定でブラウザからダイレクトにモジュールをimportすることができる。

Yarn, npmなどを使う必要がなくなる。

Railsではそれ用のGemが用意されている、おそらくRails7ではこれがデフォルトでinstallされる。  
[rails/importmap-rails: Use ESM with importmap to manage modern JavaScript in Rails without transpiling or bundling.](https://github.com/rails/importmap-rails)

Hotwireなどもimport mapを通して読み込まれる。ブラウザで見ると`<script type='importmap'>`が該当する箇所。

![importmap](https://user-images.githubusercontent.com/33926355/132976540-4e5151ba-1d54-4515-8c56-3d5968f8f82e.png)


\# TODO: import mapの利点などをもう少し詳しく書く。

## Railsはどこに向かうのか

[Rails 7 will have three great answers to JavaScript in 2021+](https://world.hey.com/dhh/rails-7-will-have-three-great-answers-to-javascript-in-2021-8d68191b)の最後の方から引用です。

> Rails needs to be a wonderful framework for developing traditional single-page JavaScript applications – complete with client-side routing, heavy state management, and all the other complexities of that style. And it's going to be.

Railsはクライアントサイドのルーティング、状態管理などを含むSPA開発でも使えるようなまさにフルスタックなフレームワークを目指しているようです。JavaScriptのデフォルトをどうするかはDHH自身が長年悩んで、Rails7ではその回答を導き出したとのこと。

> Rails has supported this path for a long time with --api, and will continue to do so. This is not a path I'd recommend for small-to-medium-sized teams, but if you're inside a large organization committed to making SPAs with high walls between front-end and back-end departments, it might make sense.

バックエンドはRails APIでフロントエンドはReact等でSPA化するなどはDHHはあまり推していない印象です。特に小さいチームでは。
RailsがJavaScriptに関しても面倒を見てSPAを作れるようにするから、それらをうまく使ってくれという感じかなと思います。

## 色々考えさせられる系の記事

DHHの考え方がフロントエンド界隈の人から指摘を受けていることを思い出しました。

- [Railsを主戦場としている自分が今後学ぶべき技術について(随筆) | うなすけとあれこれ](https://blog.unasuke.com/2020/i-have-to-learn-those-things-in-the-future/)
- [Re: Rails を主戦場としている自分が今後学ぶべき技術について](https://zenn.dev/mizchi/articles/d33a4174cca886)
- [Railsの未来についての一考察 - okuramasafumiのブログ](https://okuramasafumi.hatenablog.jp/entry/2020/12/16/224401)



