---
title: 【翻訳】NextJS と TypeScript のプロジェクトで Google Analytics を使用する
date: "2021-02-19"
category: "dev"
---

以下は [Using Google Analytics with NextJS and TypeScript | Frontend Digest](https://medium.com/frontend-digest/using-nextjs-with-google-analytics-and-typescript-620ba2359dea) の翻訳記事です。著者の許可を得て、翻訳・公開しています。

Google Analytics はユーザー、ブラウザ、デバイスのトラッキングに使用される非常に人気のある無料ツールです。NextJS は　 2020 年に React プロジェクトを作成するためのベストな方法です。2 つを組み合わせて何か作りましょう。

今日は NextJS プロジェクトで Google Analytics を使い始める方法を紹介します。この目標を達成するために独自のカスタム `_document` を追加して、トラッキングスニペットを挿入し、ページビューとイベントをトラッキングします。

## 始める

まず、`npx create-next-app`を使用して新しい NextJS アプリをブートストラップすることから始めましょう。サンプルアプリを作成するため、ターミナルで以下のコマンドを実行して下さい。

```shell
npx create-next-app --example with-typescript next-typescript-ga
```

また、`gtag` の型定義を追加する必要があります。

```shell
yarn add -D @types/gtag.js
```

完了したら、お気に入りのエディターでディレクトリを開きましょう。

## gtag utils を作成する

私達の最初の仕事は、`utils/gtag.ts` ファイルを作成することです。このファイルでは、Google Analytics イベントのラッパー関数をいくつか作成します。シンプルに `utils/gtag.ts` ファイルを作成して、次の内容をコピーペーストして下さい。`GA_TRAKING_ID`の値は、必ずご自身のトラッキング ID に変更して下さい。

```ts:utils/gtag.ts
export const GA_TRACKING_ID = "<YOUR_GA_TRACKING_ID>";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
```

## カスタム `_document` を使用して Google Analytics を導入する

次のタスクは、実際に `gtag.js` スクリプトを導入することです。カスタム `pages/_document` ファイルを作成し、次のコードを追加することでそれを行います。カスタムドキュメントの使用に関する詳細な情報は、[NextJS のドキュメント](https://nextjs.org/docs/advanced-features/custom-document)を参照してください。

```tsx:pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../utils/gtag";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

## カスタム \_app を使用したページビューとイベントのトラッキング

最後のステップとして、カスタム `_app` を作成します。ここで next router から `routeChangeComplete` をリッスンして、ページビューイベントを発火します。シンプルに `_app.tsx` を作成して、次の内容をコピーペーストして下さい。

```tsx:_app.tsx
import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import * as gtag from "../utils/gtag";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
};

export default App;
```

## 次のステップ

プロダクションのときだけトラッキングしたいでしょう。`process.env.NODE_ENV === 'production'` の結果をもとにトラッキングスクリプトをレンダリングするよう条件分岐することで、それを実現できます。

## 結論

これで、外部の実行時の依存関係を追加することなく、Google Analytics を使用した NextJS のセットアップができました。いつものように、質問や提案があればコメントで知らせて下さい。ありがとう！

## 翻訳者追記

先日このブログに Google Analytics を導入した時、日本語でいい感じの記事があまりなかったので、こちらの記事を参考にさせて頂きました。Twitter で連絡したところ、快く承諾して頂けて嬉しかったです。

```twitter
1362534819738112000
```

GA を導入したときの PR はここです: [Setup for Google Analytics by kenzoukenzou · Pull Request #94 · kenzoukenzou/nextJsBlog](https://github.com/kenzoukenzou/nextJsBlog/pull/94/files)
