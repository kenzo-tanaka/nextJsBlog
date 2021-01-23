export default function ShareBtns({ slug, title }) {
  const pageUrl = `https://next-js-blog-taupe.vercel.app/posts/${slug}`;
  const postTitle = encodeURIComponent(`${title} | Kenzo Blog`);
  return (
    <>
      <a
        href={`https://twitter.com/share?url=${pageUrl}&text=${postTitle}&via=kenzoooooB`}
        rel="nofollow"
      >
        Share on Twitter
      </a>
      /
      <a
        href={`https://www.facebook.com/share.php?u=${pageUrl}`}
        rel="nofollow"
      >
        Facebook
      </a>
      /
      <a
        href={`http://b.hatena.ne.jp/add?mode=confirm&url=${pageUrl}`}
        rel="nofollow"
      >
        Bookmark
      </a>
    </>
  );
}
