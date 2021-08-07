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

  // @see: https://github.com/jprichardson/node-fs-extra/blob/master/docs/writeJson.md
  fs.writeJsonSync("./contents/qiita/articles.json", articles);
})
