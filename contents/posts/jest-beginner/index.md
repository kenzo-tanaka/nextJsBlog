---
title: "当ブログにJESTを導入した。"
date: "2021-04-24"
category: "dev"
---

当ブログに JEST を導入した時のメモです。

## 経緯

業務で Next.js を使うことになりました。JavaScript でテストを書いたことはなかったので、色々調べてみて当ブログにも JEST を導入しました。

その時の PR がこれです。  
[スナップショットテストを追加 by kenzo-tanaka · Pull Request #179 · kenzo-tanaka/nextJsBlog](https://github.com/kenzo-tanaka/nextJsBlog/pull/179)

## JavaScript のテストの種類

## JEST を導入する

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

スナップショットテストはプログラムの出力を前回の出力と比較して、差分が生じていないかをチェックするテストです。スナップショットが一致しない場合テストが落下するため、意図しない UI の変更が生じていないかをチェックできます。

[スナップショットテスト · Jest](https://jestjs.io/ja/docs/snapshot-testing)

スナップショットのテストの置き場ですが、人によって分かれているようで。

- `./_tests__`
- `./componennts/__tests__`

自分のブログの場合は、最終的に `/components/__tests__`下に置く形を採用しました。こちらのほうがコンポーネントファイルとの距離が近いので、可視性が高いかなと考えたからです。

act ワーニングが出る。
参考記事などの書き方だと`act`ワーニングが出続けていたので、書き方を途中変更しました。この際も zenn-editor を参考にしました。この時の差分がこちらです。
[test: snapshot を update してテストを実行 & profile.test.tsx の実装で act の warning が出ないよう修正 · kenzo-tanaka/nextJsBlog@ba32cb8](https://github.com/kenzo-tanaka/nextJsBlog/commit/ba32cb8059730c143d8c2205920a3be5ad8ee448)

### 参考記事

- [Next.js+TypeScript 環境で Jest を設定してテストをする](https://zenn.dev/garypippi/articles/c79cb002e001681a73cd)
- [Next.js + TypeScript のプロジェクトに JEST を導入する - Qiita](https://qiita.com/keitakn/items/0a714997eb058f2f67e2)
