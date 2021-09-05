const request = require('request');
import fs from "fs-extra";
import { ExternalPostData } from "@types";
import { config } from "../site.config";

const articleJsonPath = './contents/qiita/articles.json'

request(`https://qiita.com/api/v2/users/${config.qiitaId}/items`, function (error: Object, response: Object, body: string) {
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

  const pastPosts = fs.readJSONSync(articleJsonPath);
  if (JSON.stringify(pastPosts) === JSON.stringify(articles)) {
    console.log('Qiitaの記事は更新がなかったのでファイルを更新しませんでした。')
    return;
  } else {
    fs.writeJsonSync(articleJsonPath, articles);
  }
})
