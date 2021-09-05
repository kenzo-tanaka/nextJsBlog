const request = require('request');
const _ = require('lodash');
import fs from "fs-extra";
import { ExternalPostData } from "@types";
import { config } from "../site.config";

const articleJsonPath: string = './contents/qiita/articles.json'
const pastPosts: ExternalPostData[] = fs.readJSONSync(articleJsonPath);

request(`https://qiita.com/api/v2/users/${config.qiitaId}/items`, function (error: Object, response: Object, body: string) {
  const currentPosts: ExternalPostData[] = JSON.parse(body).map((element: { title: string, created_at: string, url: string }) => {
    return (
      {
        'title': element['title'],
        'created_at': element['created_at'],
        'url': element['url'],
      }
    )
  });

  if (_.isEqual(pastPosts, currentPosts)) {
    console.log('Qiitaの記事は更新がなかったのでファイルを更新しませんでした。');
  } else {
    fs.writeJsonSync(articleJsonPath, currentPosts);
    console.log('Qiitaの新しい記事を反映しました。');
  }
})
