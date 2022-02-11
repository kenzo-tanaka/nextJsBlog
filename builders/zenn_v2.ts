import axios from "axios"
import fs from "fs-extra"
import { config } from '../site.config'
import { ExternalPostData } from "@types";

const articleJsonPath: string = "./contents/zenn/articles.json"
const _ = require('lodash');
const getPosts = async (url: string) => {
  const response = await axios.get(url)
  return response.data;
}

export const comparePosts = (pastPosts: ExternalPostData[], currentPosts: ExternalPostData[]): boolean => {
  return (_.isEqual(pastPosts, currentPosts))
}

export const readPostFile = (path: string) => {
  return (fs.readJSONSync(path))
}

export const writeJsonFile = (path: string, data: any): void => {
  fs.writeJsonSync(path, data);
}

export const getZennPosts = async () => {
  const posts = await getPosts(`https://zenn.dev/api/articles?username=${config.zennId}&order=latest`);
  const currentPosts: ExternalPostData[] = posts['articles'].map((element: { title: string, created_at: string, slug: string }) => {
    return {
      'title': element['title'],
      'created_at': element['created_at'],
      'url': 'https://zenn.dev/kenzo/articles/' + element['slug'],
    }
  });
  return currentPosts
}

const main = async () => {
  const pastPosts = readPostFile(articleJsonPath)
  const currentPosts = await getZennPosts()

  if (comparePosts(pastPosts, currentPosts)) {
    console.log('Zennの記事は更新がなかったのでファイルを更新しませんでした。')
  } else {
    console.log('Zennの新しい記事を反映しました。');
  }
}
