import fs from "fs";
import path from "path";
import { config } from "../site.config";
import { getMatterResult } from "./helper";

const postDir = config.postDir;

export function getSortedPostsData() {
  const dirNames = fs.readdirSync(postDir);
  const allPostsData = dirNames.map((dirName) => {
    const matterResult = getMatterResult(
      path.join(postDir, dirName, "index.md")
    );
    // スプレッド構文を使うと、この下の date により比較でエラーになるため個別に指定
    return {
      slug: dirName,
      date: matterResult.data.date,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export const getAllPostSlugs = () => {
  const dirNames = fs.readdirSync(postDir);
  return dirNames.map((dirName) => {
    return {
      params: {
        slug: dirName,
      },
    };
  });
};

export async function getPostData(slug: string) {
  const matterResult = getMatterResult(path.join(postDir, slug, "index.md"));
  return {
    slug: slug,
    content: matterResult.content,
    category: matterResult.data.category,
    thumbnail: matterResult.data.thumbnail || null,
    ...matterResult.data,
  };
}
