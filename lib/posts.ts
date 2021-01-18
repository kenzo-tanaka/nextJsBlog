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

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postDir);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export function getPostData(id: string) {
  const fullPath = path.join(postDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
