// Handle /contents/pages files
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const pageDir = path.join(process.cwd(), "contents/pages");

export async function getPageData(dirName: string) {
  const fullPath = path.join(pageDir, dirName, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const content = matterResult.content;

  return {
    slug: dirName,
    content,
    ...matterResult.data,
  };
}
