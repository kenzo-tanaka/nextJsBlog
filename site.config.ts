import path from "path";

export const config = {
  siteMeta: {
    title: "Kenzo Blog",
    description: "Tech Blog by Kenzo Tanaka",
    author: "Kenzo Tanaka",
  },
  gaID: "G-YVLG2X1KMY",
  postDir: path.join(process.cwd(), "contents/posts"),
  repo: "https://github.com/kenzoukenzou/nextJsBlog",
  siteRoot:
    process.env.NODE_ENV === "production"
      ? "https://kenzoblog.vercel.app"
      : "http://localhost:3000",
};
