const request = require('request');
import fs from "fs-extra";
import { ExternalPostData } from "@types";
import { config } from "../site.config";

const articleJsonPath: string = './contents/qiita/articles.json'
const pastPosts: ExternalPostData[] = fs.readJSONSync(articleJsonPath);
const newPostPresent = (past: string, current: string) => {
  return past !== current;
}

request(`https://qiita.com/api/v2/users/${config.qiitaId}/items`, function (error: Object, response: Object, body: string) {
  const currentPosts: ExternalPostData[] = [];
  JSON.parse(body).forEach((element: ExternalPostData) => {
    currentPosts.push(
      {
        'title': element['title'],
        'created_at': element['created_at'],
        'url': element['url'],
      }
    )
  });

  if (newPostPresent(JSON.stringify(pastPosts), JSON.stringify(currentPosts))) {
    fs.writeJsonSync(articleJsonPath, currentPosts);
    console.log('Qiitaの新しい記事を反映しました。');
  } else {
    console.log('Qiitaの記事は更新がなかったのでファイルを更新しませんでした。');
  }
})
