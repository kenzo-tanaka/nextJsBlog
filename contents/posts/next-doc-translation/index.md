---
title: Next.js のドキュメント翻訳プロジェクトに参加した。
date: "2021-02-10"
category: "dev"
---

このブログでもお世話になっている Next.js の(非公式)ドキュメント翻訳プロジェクトがあったため、参加してきました。その感想などをまとめておきます。

リポジトリ: [Nextjs-ja-translation/Nextjs-ja-translation-docs](https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs)

## きっかけ・動機

Next.js の学習を始めた頃に下記のツイートをタイムラインで見かけました。訳し切れるか不安はありましたが、Next.js の仕様もより深く知りたかったですし、OSS コントリビュートしたい欲があったので参加することにしました。

```twitter
1283960678118649856
```

また、リポジトリのコントリビューターを見ると Twitter でお見かけする方々も参加されていたので、それもモチベーションになりました。

[Contributors to Nextjs-ja-translation/Nextjs-ja-translation-docs](https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs/graphs/contributors)

## 翻訳したページ

- [Basic Features: Image Optimization | Next.js](https://nextjs.org/docs/basic-features/image-optimization)
- [Basic Features: Fast Refresh | Next.js](https://nextjs.org/docs/basic-features/fast-refresh)

最初に担当した画像最適化のページは他よりも文章量が多く、やや苦戦しましたがなんとか PR をだせました。その後、欲が出てもう 1 ページ担当させてもらいました。

## 得られたこと・感想

顔もあわせたことがない人とやり取りして、OSS にがっつりコントリビュートするというのが初めてでした。「会ったこともない人と無償で働く」というのは、エンジニアじゃないと得られない興味深い体験で楽しかったです。

fork してローカルに clone して PR 出すまでの一連の流れも経験できて良かったです。レビュアの方には負担にならないよう、何度もセルフチェックをしてから PR を出すようにしました。

自分が担当した箇所については、Next.js の仕様の理解は少し深まった気がします。Next.js の画像最適化は、外部にホストされた画像に対しても行われるという点が新しい発見でした。

OSS にコントリビュートするなど自分には難しく遠い存在に考えていましたが、経験の浅い自分でも貢献できることはあるのだなと身にしみて分かりました。OSS に Issue を立てたりすることに抵抗がなくなり、最近だと `react-markdown` の README の修正とかをやったりもしました。(超軽微なものですが...)

[Fix `uri-transformer.js` link on README by kenzoukenzou · Pull Request #543 · remarkjs/react-markdown](https://github.com/remarkjs/react-markdown/pull/543)

## 参加方法

[この Issue](https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs/issues/3)に「`docs/..` を担当します！」と宣言すれば参加できます。Slack で質問したりもできるので OSS 初心者で参加しやすいプロジェクトを探している方にはおすすめです。
