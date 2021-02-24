import fs from "fs";
import matter from "gray-matter";

export const getMatterResult = (fullPath: string) => {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return matterResult;
};

export const isURL = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};
