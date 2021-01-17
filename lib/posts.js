// fetch data from file system
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDir = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const fileNmaes = fs.readdirSync(postDir);
  const allPostsData = fileNmaes.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
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
