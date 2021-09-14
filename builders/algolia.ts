import fs from "fs";
import { getSortedPostsData } from "../lib/posts";
import algoliasearch from "algoliasearch";

require("dotenv").config("../.env.local");

const basicPath: string = "./data/";
const allArtilcesPath: string = basicPath + "all-articles.json";
const client = algoliasearch(
  `${process.env.ALGOLIA_APP_ID}`,
  `${process.env.ALGOLIA_ADMIN_KEY}`
);
const index = client.initIndex("kenzo_blog");

type Post = {
  slug: string;
  date: string;
  title: string;
  category: string;
}

const getTimeStamp = (): string => {
  const today = new Date();
  const timeStamp =
    today.getFullYear() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0") +
    "-" +
    String(today.getTime());
  return timeStamp;
};

const newFilePath = (): string => {
  const timeStamp = getTimeStamp();
  return basicPath + timeStamp + "-algolia.json";
};

const pastAllPosts = (): string => {
  const pastPostsArray = JSON.parse(fs.readFileSync(allArtilcesPath, "utf8"));
  return JSON.stringify(pastPostsArray);
};

// 既存のall-articles.jsonとgetSortedPostsData()との差分(追加分)を取得
const postsGap = (): Post[] => {
  const currentPosts: Post[] = getSortedPostsData();
  const pastPosts: string = pastAllPosts();

  let gap: Post[] = [];
  currentPosts.forEach((post: Post) => {
    const stringPost = JSON.stringify(post);

    if (!pastPosts.includes(stringPost)) {
      gap.push(post);
    }
  });
  return gap;
};

const writeToFile = (path: string, data: string): void => {
  fs.writeFile(path, data, (err) => {
    if (err) throw err;
    console.log(path + " への書き込みが完了しました。");
  });
}

const main = (): void => {
  const newFile = newFilePath();
  const gap = postsGap();

  if (gap.length === 0) {
    console.log(
      "差分が検出されなかったため、JSONファイルは作成されませんでした。"
    );
    return;
  }

  fs.writeFile(newFile, JSON.stringify(gap), (err) => {
    if (err) throw err;
    console.log(newFile + " への書き込みが完了しました。");
  });
  writeToFile(allArtilcesPath, JSON.stringify(getSortedPostsData()));
  // index
  //   .saveObjects(gap, { autoGenerateObjectIDIfNotExist: true })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

main();
