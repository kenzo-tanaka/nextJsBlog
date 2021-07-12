---
title: "GraphQLに入門してみたメモ"
date: "2021-07-11"
category: "dev"
---

## メリット

LayerX さんのエンジニアブログが参考になりました。  
[GraphQL でバックエンドのコードをすっきりさせた話 - LayerX エンジニアブログ](https://tech.layerx.co.jp/entry/2021/04/12/121427)

僕の理解では GraphQL を使うことによって得られるメリットは以下です。

- 本当に必要なデータを手軽に取得できる（複雑なクエリを書かなくて良い）
- 不要なデータは取得しないので、パフォーマンスを落とさない

GraphQL からは SQL・NoSQL・REST などに接続が可能。なので GraphQL をバックエンド・フロントエンドの界面として用意しておけば後で DB を置き換えたりなどもしやすい。

![](https://camo.qiitausercontent.com/233a8d1c741735932d52ebc06292db33a464a939/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130383736312f33656532323234622d636639362d613636342d616531392d6264313139393864316266612e706e67)

PIXTA が運営する texta.fm でも GraphQL を界面として使うという表現がされていた。  
[Sideshow 4. Worse is Better by texta.fm • A podcast on Anchor](https://anchor.fm/textafm/episodes/Sideshow-4--Worse-is-Better-eqsi31)
