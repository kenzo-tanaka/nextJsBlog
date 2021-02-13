---
title: Next.js ブログに Tailwind CSS を導入した際、記事のスタイルがリセットされる問題
date: "2021-02-13"
category: "dev"
---

Next.js で書かれているこちらのブログに、 Tailwind CSS を導入しました。  
[Tailwind CSS](https://tailwindcss.com/)

## 導入手順

下記の公式の手順どおりにやれば、すぐにセットアップできます。

[Install Tailwind CSS with Next.js - Tailwind CSS](https://tailwindcss.com/docs/guides/nextjs)

僕のブログの環境では、以下を実行しました。

```shell
# If you're on Next.js v9 or older
npm install tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9

npx tailwindcss init -p
```

```tsx:_app.tsx
import "../styles/global.scss";
import "tailwindcss/tailwind.css";
```

```scss:global.scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## マークダウン記事の h2 などのスタイルを Tailwind が書き換えてしまう問題

Tailwind CSS をグローバルに読み込んでいるので、記事ページの h2 に今まで当てていたスタイルなどが全てリセットされます。

```css
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}
```

[ここ](https://tailwindcss.com/docs/adding-base-styles)に書かれている方法を取れば、デフォルトのスタイルを色々変えたりできます。ただどの方法も実装例が少ないことと、リロードしてスタイルをチェックするのに数十秒を要する重さで DX を損ねるので採用しませんでした。

僕のブログでは、記事のスタイルようの`post.scss`を作成して、そこに記事のスタイルを書いて、`global.scss`で読んでいます。

```tsx:[slug].tsx
// スタイルを当てられるよう .markdown-body で囲む
<div className="markdown-body">
  <ReactMarkdown
    renderers={{ code: CodeBlock, image: Img }}
    plugins={[gfm]}
    children={content}
    allowDangerousHtml={true}
  />
</div>
```

```scss:post.scss
.markdown-body {
  margin-top: 20px;
  p {
    margin-bottom: 15px;
  }
  // 色々スタイリング
}
```

```scss:global.scss
@import "./post.scss";
```

こうすれば、Tailwind のスタイルよりも自作のものが優先されるので、記事の h2 などにもスタイルを当てられるようになります。

僕のブログでは自分で書いているスタイルは `post.scss` に書いているものくらいで、その他は混乱しないよう全て Tailwind のスタイルに書き換えました。

ソースコードは全て公開しているので、気になる方はブラウジングしてみてください。  
[kenzoukenzou/nextJsBlog: Personal Blog powered by Next.js and TypeScript.](https://github.com/kenzoukenzou/nextJsBlog)
