---
title: Next.js ブログでマークダウンの記事にツイートの埋め込む
date: "2021-02-09"
category: "dev"
---

最近、Next.js で書いているこのブログにツイートの埋め込みを実装したのでそのやり方などを残しておきます。以下のようにツイートを埋め込んでいて、ツイート読み込みが完了するまで時差があるので sekeleton を表示させています。

```twitter
1353188620912402433
```

## 前提・環境

記事は `/contents/posts/<slug>/index.md` で Markdown 記法で書かれていて、記事を HTML としてレンダリングするために `react-markdown` を使用しています。

- `next`: ^10.0.0
- `react`: 17.0.1
- `react-dom`: 17.0.1
- `react-markdown`: ^5.0.3
- `react-twitter-embed`: ^3.0.3
- `react-loading-skeleton`: ^2.1.1

やり方としては 2 通りが考えつきました。

- `mdx` を使って、`import { TwitterTweetEmbed } from "react-twitter-embed";`
- `md` ファイルに何とかして埋め込む

多くの記事がすでに`md`で書かれていたことと、`mdx`を採用した場合 [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) の設定周りがうまく機能しなかったことなどから `.md`のファイルへ埋め込むことにしました。

`react-markdown` を使っている場合、 `allowDangerousHtml={true}` の設定を加えれば埋め込みコードでもツイートはレンダリングされるのですが、画面遷移で記事を表示した際スタイルが効きませんでした。以下はそういった事象を回避するやり方です。

## コードブロックとして埋め込む

結論、以下のようにしています。
マークダウンの中のコードブロックで、`language` が `twitter` だったら埋め込みをするコンポーネントを返すようにしています。マークダウン記事の中では、`value` としてツイート ID を渡します。

```tsx:[slug].tsx
import ReactMarkdown from "react-markdown";
import Skeleton from "react-loading-skeleton";
import { TwitterTweetEmbed } from "react-twitter-embed";

const CodeBlock = ({
  language,
  value,
}: {
  language: string;
  value: string;
}) => {
  // ここで埋め込みを実現
  if (language === "twitter") {
    return (
      <TwitterTweetEmbed
        tweetId={value}
        placeholder={<Skeleton height={300} />}
      />
    );
  }
  return (
    <SyntaxHighlighter language={language} style={style} children={value} />
  );
};

const Post: NextPage<Props> = ({ postData }) => {
  const { slug, title, date, content, category } = postData;
  return (
    <Layout>
      <article>
        <ReactMarkdown renderers={{ code: CodeBlock }} children={content} />
      </article>
    </Layout>
  );
};

export default Post;
```

````md
<!-- マークダウン記事 -->

```twitter
1353188620912402433
```
````

今回はツイートの埋め込みで使いましたが、記事をカード型で埋め込んだりとかにも使えそうです。

参考: [Completely Custom Component · Issue #218 · remarkjs/react-markdown](https://github.com/remarkjs/react-markdown/issues/218#issuecomment-538083943)
