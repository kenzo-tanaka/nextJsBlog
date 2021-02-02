import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { config } from "../site.config";
import { getMatterResult } from "./matter";

const postDir = config.postDir;

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postDir);
  const allPostsData = fileNames.map((fileName) => {
    const matterResult = getMatterResult(path.join(postDir, fileName));
    // スプレッド構文を使うと、この下の date により比較でエラーになるため個別に指定
    return {
      slug: fileName.replace(/\.md$/, ""),
      title: matterResult.data.title,
      date: matterResult.data.date,
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
  const fileNames = fs.readdirSync(postDir);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export async function getPostData(slug: string) {
  const matterResult = getMatterResult(path.join(postDir, `${slug}.md`));
  return {
    slug: slug,
    content: matterResult.content,
    ...matterResult.data,
  };
}
