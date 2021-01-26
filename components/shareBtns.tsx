import { config } from "../site.config";
import utilStyles from "../styles/utils.module.css";

export default function ShareBtns({ slug, title }) {
  const pageUrl = `${config.siteRoot}/posts/${slug}`;
  const postTitle = encodeURIComponent(`${title} | Kenzo Blog`);
  return (
    <div className={utilStyles.btnsWrapper}>
      <a
        href={`https://twitter.com/share?url=${pageUrl}&text=${postTitle}&via=kenzoooooB`}
        rel="nofollow"
        target="_blank"
        className={utilStyles.snsBtn}
        style={{ padding: "4px" }}
      >
        <img
          src="/images/twitter-white.svg"
          alt="Twitter"
          style={{ display: "inline" }}
        />
      </a>
      <a
        href={`https://www.facebook.com/share.php?u=${pageUrl}`}
        rel="nofollow"
        className={utilStyles.snsBtn}
        style={{ margin: "0 0.5em 0 0.5em" }}
      >
        F
      </a>
      <a
        href={`http://b.hatena.ne.jp/add?mode=confirm&url=${pageUrl}`}
        className={utilStyles.snsBtn}
        rel="nofollow"
      >
        B!
      </a>
    </div>
  );
}
