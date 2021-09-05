const request = require('request');
import fs from "fs-extra";
import { ExternalPostData } from "@types";
import { config } from "../site.config";

const articleJsonPath: string = './contents/qiita/articles.json'
const pastPosts: ExternalPostData[] = fs.readJSONSync(articleJsonPath);

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

  if (JSON.stringify(pastPosts) === JSON.stringify(currentPosts)) {
    console.log('Qiitaの記事は更新がなかったのでファイルを更新しませんでした。')
    return;
  } else {
    fs.writeJsonSync(articleJsonPath, currentPosts);
  }
})
