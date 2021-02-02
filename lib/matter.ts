import fs from "fs";
import matter from "gray-matter";

export const getMatterResult = (fullPath: string) => {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return matterResult;
};
