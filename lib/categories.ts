import fs from "fs";
import path from "path";
import { getMatterResult } from "./matter";
import { config } from "../site.config";

const postDir = config.postDir;

export async function getCategoryPosts(name: string) {
  const dirNames = fs.readdirSync(postDir);

  const categoryPosts = dirNames
    .filter((dirName) => {
      const matterResult = getMatterResult(
        path.join(postDir, dirName, "index.md")
      );
      return matterResult.data.category === name;
    })
    .map((dirName) => {
      const matterResult = getMatterResult(
        path.join(postDir, dirName, "index.md")
      );
      return {
        slug: dirName,
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
  const dirNames = fs.readdirSync(postDir);
  return dirNames.map((dirName) => {
    const matterResult = getMatterResult(
      path.join(postDir, dirName, "index.md")
    );
    return {
      params: {
        name: matterResult.data.category,
      },
    };
  });
};
