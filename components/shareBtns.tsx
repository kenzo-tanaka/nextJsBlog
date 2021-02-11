import { config } from "../site.config";

type Props = {
  slug: string;
  title: string;
};

const ShareBtns: React.FC<Props> = ({ slug, title }) => {
  const pageUrl = `${config.siteRoot}/posts/${slug}`;
  const postTitle = encodeURIComponent(`${title} | Kenzo Blog`);
  return (
    <div className="btnsWrapper">
      <a
        href={`https://twitter.com/share?url=${pageUrl}&text=${postTitle}&via=kenzoooooB`}
        rel="nofollow"
        target="_blank"
        className="snsBtn"
        style={{ padding: "4px" }}
      >
        <img src="/images/twitter-white.svg" alt="Twitter" />
      </a>
      <a
        href={`https://www.facebook.com/share.php?u=${pageUrl}`}
        rel="nofollow"
        target="_blank"
        className="snsBtn"
        style={{ margin: "0 0.5em 0 0.5em" }}
      >
        F
      </a>
      <a
        href={`http://b.hatena.ne.jp/add?mode=confirm&url=${pageUrl}`}
        className="snsBtn"
        rel="nofollow"
        target="_blank"
      >
        B!
      </a>
    </div>
  );
};

export default ShareBtns;
