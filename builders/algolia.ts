import fs from "fs";
import { PostData } from "../types";
import { getSortedPostsData } from "../lib/posts";
import algoliasearch from "algoliasearch";

require("dotenv").config("../.env.local");

const basicPath = "./data/";
const allArtilcesPath = basicPath + "all-articles.json";
const client = algoliasearch(
  `${process.env.ALGOLIA_APP_ID}`,
  `${process.env.ALGOLIA_ADMIN_KEY}`
);
const index = client.initIndex("kenzo_blog");

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

const generateFilename = (): string => {
  const timeStamp = getTimeStamp();
  return basicPath + timeStamp + "-algolia.json";
};

const generatePastJsonString = () => {
  const pastPostsArray = JSON.parse(fs.readFileSync(allArtilcesPath, "utf8"));
  return JSON.stringify(pastPostsArray);
};

// 既存のall-articles.jsonとgetSortedPostsData()との差分(追加分)を取得
const generatePostsGap = () => {
  const currentAllPostsArray = getSortedPostsData();
  const pastAllPostsString = generatePastJsonString();

  let postsGap: PostData[] = [];
  currentAllPostsArray.forEach((post: PostData) => {
    const stringPost = JSON.stringify(post);

    if (!pastAllPostsString.includes(stringPost)) {
      postsGap.push(post);
    }
  });
  return postsGap;
};

const updateAllArticles = () => {
  const allArtilces = getSortedPostsData();
  fs.writeFile(allArtilcesPath, JSON.stringify(allArtilces), (err) => {
    if (err) throw err;
    console.log(allArtilcesPath + " への書き込みが完了しました。");
  });
};

const main = () => {
  const newFile = generateFilename();
  const data = generatePostsGap();

  if (data.length !== 0) {
    fs.writeFile(newFile, JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log(newFile + " への書き込みが完了しました。");
    });
    updateAllArticles();
    index
      .saveObjects(data, { autoGenerateObjectIDIfNotExist: true })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log(
      "差分が検出されなかったため、JSONファイルは作成されませんでした。"
    );
  }
};

main();
