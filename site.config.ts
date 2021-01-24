export const config = {
  siteMeta: {
    title: "Kenzo Blog",
    description: "Tech Blog by Kenzo Tanaka",
    author: "Kenzo Tanaka",
  },
  siteRoot:
    process.env.NODE_ENV === "production"
      ? "https://kenzoblog.vercel.app/"
      : "http://localhost:3000",
};
