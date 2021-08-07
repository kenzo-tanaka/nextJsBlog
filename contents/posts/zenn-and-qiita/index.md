---
title: 'ZennとQiitaの記事をブログで見れるようにした'
date: '2021-08-07'
category: 'dev'
---

ブログのトップページに [Zenn](https://kenzoblog.vercel.app/zenn) と [Qiita](https://kenzoblog.vercel.app/qiita) タブを追加しました。僕が Zenn や Qiita に投稿した記事一覧が表示されます。

[チーム個々人のテックブログをRSSで集約するサイトを作った（Next.js）](https://zenn.dev/catnose99/articles/cb72a73368a547756862)

こちらを読んでいて、自分のブログにも外部の記事を集約できれば良さそうだなと思いました。

## 実装方法

API から記事を取得して JSON ファイルに格納して、それを読み込むといった形にしています。

```ts:builders/qiita.ts
const request = require('request');
import fs from "fs-extra";
import { ExternalPostData } from "@types";
import { config } from "../site.config";

request(`https://qiita.com/api/v2/users/${config.qiitaId}/items`, function (error: any, response: any, body: any) {
  const data = JSON.parse(body)
  const articles: ExternalPostData[] = [];
  data.forEach((element: any) => {
    const article = {
      'title': element['title'],
      'created_at': element['created_at'],
      'url': element['url'],
    }
    articles.push(article)
  });

  const pastPosts = fs.readJSONSync('./contents/qiita/articles.json');
  if (JSON.stringify(pastPosts) === JSON.stringify(articles)) {
    console.log('Qiitaの記事は更新がなかったのでファイルを更新しませんでした。')
    return;
  } else {
    fs.writeJsonSync("./contents/zenn/articles.json", articles);
  }
})

```

Qiita は公式が API を公開しているので問題なさそうですが、Zenn の方は公式か分からないので変更されたら対応が必要です。
今後は Algolia の検索にも対応していきたいです。
