---
title: styled-components, CSS Modules について調べたのでまとめる
date: "2021-01-27"
category: "dev"
---

Next.js でブログを作っているときに CSS の管理方法について、色々やり方があることを知りました。
それぞれプロコンを、調べたのでまとめておきます。

## `styled-components` を採用した経緯、運用方法(食べログ)

[Sass から CSS Modules、そして styled-components に乗り換えた話｜食べログ フロントエンドエンジニアブログ｜ note](https://note.com/tabelog_frontend/n/n2541778b81e3)

CSS Modules→styled-components に移行した話の記事です。
概要としてはデザイナーさんとの協業していくことを考えると、CSS Modules が良さそうみたいな結論になったそうです。
しかし、その後 2020/3 に webpack の css-loader で CSS Modules は deprecated としてメンテナンスステージになることを受けて、3 年後も生き残りそうな技術を選ぶという選定基準から、`styled-components` に変更。

参考: [Interoperability across tools and support plain JS modules imports · Issue #1050 · webpack-contrib/css-loader](https://github.com/webpack-contrib/css-loader/issues/1050)

「なるほどな」と思ったのが`StyledComponent`を定義したら `Styled` というプレフィックスをつけるルールだそうです。
確かにこうしておけば、自分が書いているのが `StyledComponent` なのか・カスタムコンポーネントなのかが分かりやすいなと思いました。

## `styled-components` をやめた話(Qiita - jagaapple さん)

[styled-components（CSS in JS）をやめた理由と、不完全な CSS Modules を愛する方法 - Qiita](https://qiita.com/jagaapple/items/7f74fc32c69f5b731159)

`styled-components` をやめた理由、デメリットが詳しく書かれています。

**デメリット**

- プラグインが提供されているエディタを選ばないとシンタックスハイライト・コード補完がまったく効かないこと
- `stylelint` などの開発支援ツールとの相性問題が生じる。一部のルールを使えなかったりすることがあるそう。
- styled-components は実行時にスタイル（CSS クラス）を生成する仕組みなので、`onMouseMove`のような頻繁に呼ばれるコールバック関数の中で styled-components の Props を呼ぶとパフォーマンスが低下する
  - catnose さんが `やはりstyled-componentsだとパフォーマンスが気になる` と[言っていた](https://zenn.dev/catnose99/scraps/5e3d51d75113d3#comment-eb8276f40cc215)
- どれが styled-components かわからなくなる問題
  - 上記で書いたようにプレフィックスをつければ多少は解消されそうだが、そういうルールを厳密に敷くのも大変なのかな。

## Next.js のプロジェクトではどうするか。

Next.js はビルトインサポートしている CSS Modules を推している感じはある。公式のチュートリアルでも CSS Modules を使った解説がされていた。

**使い方**

- ビルトインサポートされているので、特別な設定は必要ない
- CSS Modules を使用する場合は、ファイル名を `.module.css` にする必要がある。
- `.module.css` で定義したクラス名がそのまま付与されるのではなくて、実際はユニークなクラス名が自動的に生成されて付与される
- スタイルをサイト内でグローバルに効かせることもできる。
  - [Global Styles - Assets, Metadata, and CSS | Learn Next.js](https://nextjs.org/learn/basics/assets-metadata-css/global-styles)
- ディレクトリ構成は Zenn のやり方が参考になる。
  - `/styles` ディレクトリの下に色々作っている感じ
  - [Next.js に CSS Modules を導入する](https://zenn.dev/catnose99/scraps/5e3d51d75113d3#comment-1a556066794f35)

## 所感

最初に両方試したときの所感としては、`styled-components`の方が使いやすいと思いました。
コンポーネントファイルの中でスタイルも定義できるので、ファイルの行き来が少なくなり変更もしやすいし、見通しも良いと感じました。

```js
const BtnsWrapper = styled.div`
  margin-top: 1.8em;
  text-align: center;
`;
```

ただ確かに上記で書いた通り、どれが styled-components なのかわからなくなる問題・パフォーマンスに影響する問題などを踏まえると、`CSS Modules` の方が良いのかなと今は考えています。
少なくとも Next.js のプロジェクトでは CSS Modules で書いたほうが良さそうなので、自分のブログも CSS Modules で書いていくつもりです。
