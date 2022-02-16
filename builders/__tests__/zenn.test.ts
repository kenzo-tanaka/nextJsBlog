import { getZennPosts, comparePosts, readPostFile, writeJsonFile } from "../zenn"
import axios from "axios"
import data from "./zenn.api.json"
import fs from "fs-extra"
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("zenn", () => {
  test("記事をAPIから取得", async () => {
    mockedAxios.get.mockResolvedValue({ data: data })
    const result = await getZennPosts()

    expect(result[0]).toEqual({
      title: '一次情報を検索しやすくするChrome拡張を作った。',
      created_at: "2021-10-30T18:34:54.861+09:00",
      url: 'https://zenn.dev/kenzo/articles/e69f87236b479f'
    })
  })

  test("ファイルをRead", () => {
    const result = readPostFile("./builders/__tests__/zenn.json")
    expect(result).toEqual([
      {
        "title": "一次情報を検索しやすくするChrome拡張を作った。",
        "created_at": "2021-10-30T18:34:54.861+09:00",
        "url": "https://zenn.dev/kenzo/articles/e69f87236b479f"
      }
    ])
  })

  test("ファイルにWrite", () => {
    const path = "./builders/__tests__/test.json"
    const data = [{
      "title": "一次情報を検索しやすくするChrome拡張を作った。",
      "created_at": "2021-10-30T18:34:54.861+09:00",
      "url": "https://zenn.dev/kenzo/articles/e69f87236b479f"
    }]
    writeJsonFile(path, data)
    const result = fs.readJSONSync(path)
    expect(result).toEqual(data)

    // 後処理、ファイルを空にする
    fs.writeFileSync(path, '')
  })

  test("既存記事と比較", () => {
    const pastPosts = [
      {
        "title": "一次情報を検索しやすくするChrome拡張を作った。",
        "created_at": "2021-10-30T18:34:54.861+09:00",
        "url": "https://zenn.dev/kenzo/articles/e69f87236b479f"
      },
    ]
    const currentPosts = [
      {
        title: '一次情報を検索しやすくするChrome拡張を作った。',
        created_at: "2021-10-30T18:34:54.861+09:00",
        url: 'https://zenn.dev/kenzo/articles/e69f87236b479f'
      }
    ]

    const result = comparePosts(pastPosts, currentPosts)
    expect(result).toBe(true)
  })
})
