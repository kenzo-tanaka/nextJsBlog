const request = require('request');
import fs from "fs-extra";
import { ExternalPostData } from "@types";
import { config } from "../site.config";

const articleJsonPath = './contents/qiita/articles.json'

request(`https://qiita.com/api/v2/users/${config.qiitaId}/items`, function (error: Object, response: Object, body: string) {
  const currentPosts: ExternalPostData[] = [];
  JSON.parse(body).forEach((element: any) => {
    currentPosts.push(
      {
        'title': element['title'],
        'created_at': element['created_at'],
        'url': element['url'],
      }
    )
  });

  const pastPosts = fs.readJSONSync(articleJsonPath);
  if (JSON.stringify(pastPosts) === JSON.stringify(currentPosts)) {
    console.log('Qiitaの記事は更新がなかったのでファイルを更新しませんでした。')
    return;
  } else {
    fs.writeJsonSync(articleJsonPath, currentPosts);
  }
})
