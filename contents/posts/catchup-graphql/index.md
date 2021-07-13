---
title: "GraphQLに入門してみたメモ"
date: "2021-07-11"
category: "dev"
---

## メリット

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.  
> [GraphQL | A query language for your API](https://graphql.org/)

公式サイトの内容を意訳すると、「GraphQL は API に対しての理解可能な説明を提供する」「クライアントに必要なものだけを正確に要求」など。

さらに、LayerX さんのエンジニアブログを読むと理解が進んだ。
[GraphQL でバックエンドのコードをすっきりさせた話 - LayerX エンジニアブログ](https://tech.layerx.co.jp/entry/2021/04/12/121427)

バックエンド・フロントエンドを切り離して開発している際、フロントエンドからのデータ問い合わせの手段として GraphQL を使用すると以下のようなメリットを得られる。

- 必要なデータを正確に取得できる(アンダーフェッチ問題を起こさない)
- 不要なデータは取得しないので、パフォーマンスを落とさない(オーバーフェッチ問題を起こさない)

GraphQL からは SQL・NoSQL・REST などに接続が可能。なので GraphQL を界面としてバックエンド・フロントエンドを疎結合にしておけば後で DB だけリプレースするなども可能になるはず。

![](https://camo.qiitausercontent.com/233a8d1c741735932d52ebc06292db33a464a939/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130383736312f33656532323234622d636639362d613636342d616531392d6264313139393864316266612e706e67)

PIXTA が運営する texta.fm でも GraphQL を界面として使うという表現がされていた。  
[Sideshow 4. Worse is Better by texta.fm • A podcast on Anchor](https://anchor.fm/textafm/episodes/Sideshow-4--Worse-is-Better-eqsi31)

## 具体的な実装

具体的にどのような実装になるのかを以下の記事を参考にしながら、手を動かした。記事の後半あたりで GraphQL が出てくる。  
[Next.js + Rails プロジェクトのセットアップ手順](https://zenn.dev/kei178/articles/43172ba33eece4)

ざっくりした流れは以下。

- カラム名や型を定義する
- クエリを作成する
- 定義したクエリをルートクエリとして取得できるよう設定する
