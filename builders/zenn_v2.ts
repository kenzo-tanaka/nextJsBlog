import axios from "axios"
import { config } from '../site.config'

const getPosts = async (url: string) => {
  const response = await axios.get(url)
  return response.data;
}

export const getZennPosts = async () => {
  const posts = await getPosts(`https://zenn.dev/api/articles?username=${config.zennId}&order=latest`);

  return (
    [{
      title: '一次情報を検索しやすくするChrome拡張を作った。',
      created_at: '2021/10/30',
      url: 'https://zenn.dev/kenzo/articles/e69f87236b479f'
    }]
  )
}
