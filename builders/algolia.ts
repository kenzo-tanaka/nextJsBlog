import fs from "fs";
import { getSortedPostsData } from "../lib/posts";

const getArticleMeta = () => {
  const posts = getSortedPostsData();
  const data = JSON.stringify(posts);

  fs.writeFile("algolia.json", data, (err) => {
    if (err) throw err;
    console.log("正常に書き込みが完了しました");
  });
};

getArticleMeta();
