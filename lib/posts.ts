// fetch data from file system
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDir = path.join(process.cwd(), "contents/posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postDir);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      slug,
      ...matterResult.data,
    };
  });

  return allPostsData;

  // TODO: dateを読めないので一旦コメントアウト
  // return allPostsData.sort((a, b) => {
  //   if (a.date < b.date) {
  //     return 1;
  //   } else {
  //     return -1;
  //   }
  // });
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
  const fullPath = path.join(postDir, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const content = matterResult.content;

  return {
    slug,
    content,
    ...matterResult.data,
  };
}
