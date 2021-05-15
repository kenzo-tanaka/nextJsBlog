import fs from "fs";
import { PostData } from "../types";
import { getSortedPostsData } from "../lib/posts";
import algoliasearch from "algoliasearch";

const basicPath = "./data/";
const client = algoliasearch(
  `${process.env.ALGOLIA_APP_ID}`,
  `${process.env.ALGOLIA_API_KEY}`
);
const index = client.initIndex("your_index_name");

const generateFilename = () => {
  const today = new Date();
  const timeStamp =
    today.getFullYear() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");
  return basicPath + timeStamp + "-algolia.json";
};

const generatePastJsonString = () => {
  const jsonFiles = fs.readdirSync(basicPath);
  const jsonFilePath = basicPath + jsonFiles[jsonFiles.length - 1];

  const pastPostsArray = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));
  return JSON.stringify(pastPostsArray);
};

const generatePostsGap = () => {
  const currentPostsArray = getSortedPostsData();
  const pastPostsString = generatePastJsonString();

  let postsGap: PostData[] = [];
  currentPostsArray.forEach((post: PostData) => {
    const stringPost = JSON.stringify(post);

    if (!pastPostsString.includes(stringPost)) {
      postsGap.push(post);
    }
  });
  return postsGap;
};

const updateAllArticles = () => {
  const allArtilces = getSortedPostsData();
  const allArtilcesPath = basicPath + "all-articles.json";
  fs.writeFile(allArtilcesPath, JSON.stringify(allArtilces), (err) => {
    if (err) throw err;
    console.log(allArtilcesPath + "への書き込みが完了しました。");
  });
};

const createJson = () => {
  const newFile = generateFilename();
  const data = generatePostsGap();

  updateAllArticles();

  // TODO: data/timestamp-algolia.jsonはall-articles.jsonとの差分

  // fs.writeFile(newFile, JSON.stringify(data), (err) => {
  //   if (err) throw err;
  //   console.log("正常に書き込みが完了しました");
  // });

  // console.log(data);

  // index.saveObjects(data, { autoGenerateObjectIDIfNotExist: true });
};

createJson();
