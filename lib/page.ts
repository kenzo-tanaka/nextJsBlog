// Handle /contents/pages files
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const pageDir = path.join(process.cwd(), "contents/pages");

export async function getPageData(fileName: string) {
  const fullPath = path.join(pageDir, `${fileName}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const content = matterResult.content;

  return {
    fileName,
    content,
    ...matterResult.data,
  };
}
