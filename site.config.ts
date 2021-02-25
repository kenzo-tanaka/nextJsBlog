import path from "path";

export const config = {
  siteMeta: {
    title: "Kenzo Blog",
    description: "Tech Blog by Kenzo Tanaka",
    author: "Kenzo Tanaka",
  },
  gaID: "G-YVLG2X1KMY",
  postDir: path.join(process.cwd(), "contents/posts"),
  repo: "https://github.com/kenzo-tanaka/nextJsBlog",
  siteRoot:
    process.env.NODE_ENV === "production"
      ? "https://kenzoblog.vercel.app"
      : "http://localhost:3000",
  // カテゴリーは数を増やさない想定でデザインしているので、追加する際は注意
  categoryList: [
    { slug: "/", name: "All" },
    { slug: "/categories/dev", name: "dev" },
    { slug: "/categories/work", name: "work" },
  ],
};
