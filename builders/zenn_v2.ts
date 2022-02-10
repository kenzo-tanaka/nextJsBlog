import axios from "axios"
import { config } from '../site.config'
import { ExternalPostData } from "@types";

const getPosts = async (url: string) => {
  const response = await axios.get(url)
  return response.data;
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
