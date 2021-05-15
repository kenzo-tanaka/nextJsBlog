import fs from "fs";
import { PostData } from "../types";
import { getSortedPostsData } from "../lib/posts";

const getArticleMeta = () => {
  // const data = JSON.stringify(posts);
  // fs.writeFile("algolia.json", data, (err) => {
  //   if (err) throw err;
  //   console.log("正常に書き込みが完了しました");
  // });
  const currentPostsArray = getSortedPostsData();

  // TODO: data/下のalgoliaファイルの最新ファイルのものを取得
  fs.readFile("./data/20210509-algolia.json", "utf8", (err, postsString) => {
    const pastPostsArray = JSON.parse(postsString);
    const pastPostsString = JSON.stringify(pastPostsArray);

    let postsGap: PostData[] = [];
    currentPostsArray.forEach((post: PostData) => {
      const stringPost = JSON.stringify(post);

      if (!pastPostsString.includes(stringPost)) {
        postsGap.push(post);
      }
    });

    console.log(postsGap);
  });

  // TODO: 20210515のような日付つきファイルを作成して保存
  // TODO: できればそのままAlgolia APIを使ってFileをアップロードする
};

getArticleMeta();
