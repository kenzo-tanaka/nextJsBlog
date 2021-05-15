import fs from "fs";
import { getSortedPostsData } from "../lib/posts";

const getArticleMeta = () => {
  // const posts = getSortedPostsData();
  // const data = JSON.stringify(posts);
  // fs.writeFile("algolia.json", data, (err) => {
  //   if (err) throw err;
  //   console.log("正常に書き込みが完了しました");
  // });
  // TODO: data/下のalgoliaファイルの最新ファイルのものを取得
  // TODO: fileをReedする
  // TODO: Readした内容をオブジェクトの配列として変数に入れる
  // TODO: 既存の記事一覧との差分の配列を作成する
  // TODO: 20210515のような日付つきファイルを作成して保存
  // TODO: できればそのままAlgolia APIを使ってFileをアップロードする
};

getArticleMeta();
