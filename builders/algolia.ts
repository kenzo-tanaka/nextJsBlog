import fs from "fs";
import { PostData } from "../types";
import { getSortedPostsData } from "../lib/posts";

const basicPath = "./data/";

const generateFilename = () => {
  const today = new Date();
  const timeStamp =
    today.getFullYear() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0");
  return basicPath + timeStamp + "-algolia.json";
};

const createJson = () => {
  const currentPostsArray = getSortedPostsData();

  const jsonFiles = fs.readdirSync(basicPath);
  const lastJsonFile = jsonFiles[jsonFiles.length - 1];
  const jsonFilePath = basicPath + lastJsonFile;

  fs.readFile(jsonFilePath, "utf8", (err, postsString) => {
    const pastPostsArray = JSON.parse(postsString);
    const pastPostsString = JSON.stringify(pastPostsArray);

    let postsGap: PostData[] = [];
    currentPostsArray.forEach((post: PostData) => {
      const stringPost = JSON.stringify(post);

      if (!pastPostsString.includes(stringPost)) {
        postsGap.push(post);
      }
    });

    const fileName = generateFilename();
    fs.writeFile(fileName, JSON.stringify(postsGap), (err) => {
      if (err) throw err;
      console.log("正常に書き込みが完了しました");
    });
    // TODO: できればそのままAlgolia APIを使ってFileをアップロードする
  });
};

createJson();
