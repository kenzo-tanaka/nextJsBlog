const request = require('request');
const axios = require('axios').default;
const _ = require('lodash');
import fs from "fs-extra";
import { ExternalPostData } from "@types";
import { config } from "../site.config";

const articleJsonPath: string = './contents/qiita/articles.json'
const pastPosts: ExternalPostData[] = fs.readJSONSync(articleJsonPath);

const getPosts = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
}

const main = async () => {
  try {
    const posts = await getPosts(`https://qiita.com/api/v2/users/${config.qiitaId}/items`)
    const currentPosts: ExternalPostData[] = posts.map((element: { title: string, created_at: string, url: string }) => {
      return {
        'title': element['title'],
        'created_at': element['created_at'],
        'url': element['url'],
      }
    })

    if (_.isEqual(pastPosts, currentPosts)) {
      console.log('Qiitaの記事は更新がなかったのでファイルを更新しませんでした。');
    } else {
      fs.writeJsonSync(articleJsonPath, currentPosts);
      console.log('Qiitaの新しい記事を反映しました。');
    }
  } catch (error) {
    console.log(error);
  }
}

main();
