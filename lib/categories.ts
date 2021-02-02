import fs from "fs";
import path from "path";
import { getMatterResult } from "./matter";
import { config } from "../site.config";

const postDir = config.postDir;

export async function getCategoryPosts(name: string) {
  const fileNames = fs.readdirSync(postDir);

  const categoryPosts = fileNames
    .filter((fileName) => {
      const matterResult = getMatterResult(path.join(postDir, fileName));
      return matterResult.data.category === name;
    })
    .map((fileName) => {
      const matterResult = getMatterResult(path.join(postDir, fileName));
      return {
        slug: fileName.replace(/\.md$/, ""),
        title: matterResult.data.title,
        content: matterResult.content,
        date: matterResult.data.date,
        category: matterResult.data.category,
      };
    });

  return categoryPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export const getCategoryNames = () => {
  const fileNames = fs.readdirSync(postDir);
  return fileNames.map((fileName) => {
    const matterResult = getMatterResult(path.join(postDir, fileName));
    return {
      params: {
        name: matterResult.data.category,
      },
    };
  });
};
