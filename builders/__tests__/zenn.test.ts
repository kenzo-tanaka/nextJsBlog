import { getZennPosts } from "../zenn_v2"

describe("zenn", () => {
  test("zenn", async () => {
    const result = await getZennPosts()
    expect(result).toEqual([{
      title: '一次情報を検索しやすくするChrome拡張を作った。',
      created_at: '2021/10/30',
      url: 'https://zenn.dev/kenzo/articles/e69f87236b479f'
    }])
  })
})
