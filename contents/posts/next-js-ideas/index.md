---
title: 'Next.jsのブログに盛り込んでいる工夫色々'
date: '2021-09-03'
category: 'dev'
---

今年の年始にこのブログを開設してから、運用しやすいよう盛り込んできた工夫などをご紹介します。


## このブログの技術構成
- Next.js SSG
- Tailwind
- Vercel
- Algolia


## Algoliaを入れて検索しやすくしている
Algoliaを導入して検索しやすいようにしています。

検索ヒットした項目にTabキーで移動できるようにもしていて、自分の記事を検索して読み返すことがたまにあるのですが、そこそこ快適につかえています。

Algoliaのセットアップの手順はこちらに詳しく書きました：
[Next.jsのブログにAlgoliaで検索機能を導入する](https://zenn.dev/kenzo/articles/2fbb4f1e4b126f)

また最近`connectSearchBox`という存在を知りまして、これを使うとAlgoliaのUIのカスタマイズが自由にできるのでとても便利です！

> If you want to create your own UI of the SearchBox widget or use another UI library, you can use connectors.
[SearchBox | React InstantSearch | API parameters | API Reference | Algolia Documentation](https://www.algolia.com/doc/api-reference/widgets/search-box/react/#connector)

## Algoliaへのレコード登録を自動化している

記事を追加したときにそれを検索対象とするには、Algoliaにレコードを登録する必要があります。
手動で登録するのは面倒なので、ここは自動化しています。

[nextJsBlog/run-algolia.yml at main · kenzo-tanaka/nextJsBlog](https://github.com/kenzo-tanaka/nextJsBlog/blob/main/.github/workflows/run-algolia.yml)

具体的にやっていることとしては以下です：
- `contents/posts/**`以下が更新されたとき、記事作成されたと判断してGitHub Actionsを起動
- 自前で作ってあるnpmスクリプト`npm run build:algolia`を実行して、Algoliaに登録するようの追加分の記事のJSONファイルを作成してAlgoliaのAPIを使ってアップロードする
- 上記処理で生成されたファイルをGit commit, pushする
  - このGitコミットはAlgoliaアップロード用のJSONファイルを生成しているだけなので、Vercelの自動デプロイは起動させないようにしています。

## ZennとQiita記事をキュレーションしている
内容によってZennなどにもポストしているので、それらを1つのブログ上で確認できたら見やすいかなと思って、ZennとQiitaの記事をAPIから取得する処理を書いています。

[ZennとQiitaの記事をブログで見れるようにした](https://kenzoblog.vercel.app/posts/zenn-and-qiita)

APIで記事一覧の取得は`npm run build:zenn`などのコマンドでできるようにしているのですが、投稿頻度が不定期なのでコマンド実行を自動化するところまではできていません。

## 記事の画像を相対パスで読めるようにしている

記事中で使う画像に関して、できれば記事のマークダウンファイルが入っているところと同じディレクトリで管理したいと考えていました。なので、それを実現するための実装を盛り込んでいます。

https://github.com/kenzo-tanaka/nextJsBlog/blob/aeb7d4dffdf85f5047f216aa966447ea0702d922/pages/posts/%5Bslug%5D.tsx#L92-L103

`next-optimized-images`によって実現できているのですが、Next.jsのデフォルトの機能として用意されていないのかなどはちゃんと調べられていないので、ちゃんと調べます。

## 週1でブログを書くようGitHub Actionsが通知を飛ばす

Next.jsとは関係ないことですが、ブログ投稿を習慣づけするため、GitHub Actionsが週1でIssueを作成するように設定していて、これをリマインダー代わりとしています。
色々意見はあると思いますが、僕はある程度拙い内容でもアウトプットすること、それを継続することに意味はあると思っています。

[nextJsBlog/blog-notifier.yml at main · kenzo-tanaka/nextJsBlog](https://github.com/kenzo-tanaka/nextJsBlog/blob/main/.github/workflows/blog-notifier.yml)

作成されたIssueのコメント欄に書きたい記事のメモを残したり、原稿を書いたりするので、この運用は今の所うまく行っている気がしています。この記事もIssueのコメント上で原稿を書いています。

同様に月1で「自分リリースノート」というものを書いているので、これもGitHub Actionsでリマインダーを設定しています。
[nextJsBlog/create-issue.yml at main · kenzo-tanaka/nextJsBlog](https://github.com/kenzo-tanaka/nextJsBlog/blob/main/.github/workflows/create-issue.yml)

## Aboutページの内容を職務経歴書としてPDFで出力できるようにしている

自己紹介のようなページを作っているのですが、ここに経歴等を記載して職務経歴書として使えるようにしています。
マークダウンのファイルなのですが、`md-to-pdf`というパッケージを使用するとPDFとして出力ができるのでとても便利です。
[職務経歴書](https://kenzoblog.vercel.app/about)
