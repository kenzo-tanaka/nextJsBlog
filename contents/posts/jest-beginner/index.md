---
title: "Next.js x TypeScriptのブログにJestを導入した。"
date: "2021-04-24"
category: "dev"
---

## 概要

仕事で Next.js を使うことになったので、Jest に入門しました。色々調べてながら当ブログ(Next.js x TypeScript x Vercel の構成)にも Jest を導入しました。

その時の PR がこちらです。  
[スナップショットテストを追加 by kenzo-tanaka · Pull Request #179 · kenzo-tanaka/nextJsBlog](https://github.com/kenzo-tanaka/nextJsBlog/pull/179)

## Jest を導入する

セットアップ手順としては、ざっくり以下の 2 つです。

- パッケージのインストール
- 設定ファイルの作成

```bash
yarn add jest ts-jest react-test-renderer enzyme enzyme-adapter-react-16 enzyme-to-json @types/react-test-renderer @types/jest @types/enzyme-adapter-react-16 --dev
```

`jest.config.js`の設定。[zenn-editor の`jest.config.js`](https://github.com/zenn-dev/zenn-editor/blob/master/packages/zenn-cli/jest.config.js)も参考にしつつ、自分の環境で必要そうな設定に絞って入れました。

```js:jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  // https://github.com/zeit/next.js/issues/8663#issue-490553899
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json",
    },
  },
};
```

`tsconfig.jest.json`の設定。これは TypeScript のコードをコンパイルする時の設定値。

```json:tsconfig.jest.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "jsx": "react"
  }
}
```

## スナップショットテストを書く

スナップショットテストはプログラムの出力を前回の出力と比較して、差分がないかをチェックするテストです。意図しない UI の変更が生じていないかをチェックできます。

[スナップショットテスト · Jest](https://jestjs.io/ja/docs/snapshot-testing)

### スナップショットの置き場

スナップショットのテストの置き場ですが、Next.js の example 含め色々リポジトリを見てみたのですが、人によって置き場が分かれている感じでした。

- `./__tests__`: 公式の example はこちら
- `./componennts/__tests__`: 人によってはこちら

どちらに置いてもテストは実行できるため、自分のブログの場合は、最終的に `/components/__tests__`下に置きました。こちらのほうがコンポーネントファイルとの距離が近いので、可視性が高いかなと考えたからです。

### 公式 example の書き方

公式の example のコードでは、以下のようにスナップショットテストが書かれていました。

```js:snapshot.js
import React from 'react'
import renderer from 'react-test-renderer'
import Index from '../pages/index'

it('renders homepage unchanged', () => {
  const tree = renderer.create(<Index />).toJSON()
  expect(tree).toMatchSnapshot()
})
```

[next.js/snapshot.js at canary · vercel/next.js](https://github.com/vercel/next.js/blob/canary/examples/with-jest/__tests__/snapshot.js)

これでも問題なくテストできるのですが、以下の Warning が出力されます。

```shell
  ●  Cannot log after tests are done. Did you forget to wait for something async in your test?
    Attempted to log "Warning: An update to Link inside a test was not wrapped in act(...).

    When testing, code that causes React state updates should be wrapped into act(...):

    act(() => {
      /* fire events that update state */
    });
    /* assert on the output */

    This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
        at Link (/Users/tanakakenzou/Documents/personal/nextjs-new-blog/node_modules/next/client/link.tsx:137:19)
        at div
        at MobileCategoryMenu".
```

これの解消は色々模索したのですが、最終的には `createRenderer`関数を使うと上記は出ないことが分かったのでそちらに変更。

```tsx:CategoryMenu.test.tsx
import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import CategoryMenu from "../categoryMenu";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

const renderer = createRenderer();
test("CategoryMenu", () => {
  renderer.render(<CategoryMenu />);
  const renderedOutput = renderer.getRenderOutput();
  expect(renderedOutput).toMatchSnapshot();
});
```

この修正の差分はこちらです。
[test: snapshot を update してテストを実行 & profile.test.tsx の実装で act の warning が出ないよう修正 · kenzo-tanaka/nextJsBlog@ba32cb8](https://github.com/kenzo-tanaka/nextJsBlog/commit/ba32cb8059730c143d8c2205920a3be5ad8ee448)

### `useRouter`のモックを作成

僕のブログのカテゴリーメニューとかは現在のパスを見るために、`useRouter`を使っています。`useRouter`を使っているコンポーネントをスナップショットテストしようとすると、`TypeError: Cannot read property ... of null`となり実行できませんでした。

Next.js のディスカッションを見ると、ここはモックを作成する必要がありそうなので、その対応も行いました。  
[How to mock useRouter? · Discussion #23034 · vercel/next.js](https://github.com/vercel/next.js/discussions/23034)

```tsx:CategoryMenu.test.tsx
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));
```

## 参考記事、リポジトリ

- [Next.js+TypeScript 環境で Jest を設定してテストをする](https://zenn.dev/garypippi/articles/c79cb002e001681a73cd)
- [Next.js + TypeScript のプロジェクトに JEST を導入する - Qiita](https://qiita.com/keitakn/items/0a714997eb058f2f67e2)
- [zenn-dev/zenn-editor: Convert markdown to html in Zenn format](https://github.com/zenn-dev/zenn-editor)
- [How to mock useRouter? · Discussion #23034 · vercel/next.js](https://github.com/vercel/next.js/discussions/23034)
