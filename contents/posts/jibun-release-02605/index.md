---
title: "自分リリースノート v 0.26.5"
date: '2021-10-30'
category: 'dev'
---

2021年10月の振り返り。

## 技術関連

- 受託継続案件
  - 佳境に入りメールやり取りで一日が潰れるようなこともあった。
- 受託新規案件(業務フローの整理、要件定義など)
  - 前回案件の反省から業務フローの整理、語彙の整理などに力を入れた。共通認識を持って進められたのでやって良かった。
- Rails既存サービスのリファクタリングをした。複数の責務を持ってしまっているモデルを単一責任にして見通しが良いコードにするといったことをやっていた。
- [川島さんの記事](https://scrapbox.io/kawasima/イミュータブルデータモデル)をチームにシェアしてイベントモデルの見落としがないかどうかをチームで議論した。
  - 今までの開発ではイベント系の処理は、Enumの切り替え一択という感じだったが、イベントモデルという選択肢も持てるようになった。
- [Chrome拡張機能](https://chrome.google.com/webstore/detail/site-search/filihgjpaclkehdndcfefmdoidkilcpl)を作った。
- 業務時間外ではリファクタリング、テスト駆動開発などを読んでいた。

## アウトプット

- [Heroku Redisをアップグレードするとコネクションエラーになる件](https://kenzoblog.vercel.app/posts/heroku-redis-upgrade-connection-error)
- [ransackable_scopesを使った検索でdate_fieldを使うとエラーになる](https://kenzoblog.vercel.app/posts/ransackables-scope-date-field)
- [Slackの障害からDNSを復習する](https://kenzoblog.vercel.app/posts/learn-dns-from-slack-incident)

個人開発
- Google Extensionを作った: [kenzo-tanaka/SiteSearch: Easy way to search in a site.](https://github.com/kenzo-tanaka/SiteSearch/)

## 読書

読んでいる
- [楽々ERDレッスン](https://amzn.to/3BsCUaY)

再読
- [リファクタリング](https://amzn.to/3nGQsLb)
- [テスト駆動開発](https://amzn.to/2ZIIYzd)
- [マスタリングTCP/IP](https://amzn.to/3nGljrp)

## 振り返り

Keep
- 内容が濃く学びのある書籍やPodcastに絞ってそれらを繰り返し読むことで理解を深めた。
- TDD本を読んで終わりではなくて写経して理解を深めた。この時初めてJavaを書いた。
- リファクタリングの知識を業務のコードの中に落とし込んだ。

## 感想

リファクタリングやオブジェクト指向設計実践ガイドなどを繰り返し読んで、今までよりも綺麗なコードを書けるようになって来た気がする。たぶん。

リファクタリングなどを学んだときのアウトプット先として、現場で開発しているコードをローカルで改修してみるのはかなり良い選択肢だと思う。

* 実際のプロジェクトのコードは十分に複雑で少なからずリファクタの余地がある
* 自分が書いたり、レビューしたコードなので業務ルールをゼロから学ぶ必要がなく、コードの修正に集中できる

個人開発をいっぱいやるより、業務で自分で書いたコードを読み返す方が実装力あがりそう。
