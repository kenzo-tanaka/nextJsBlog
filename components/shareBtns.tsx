import React from "react";
import { config } from "../site.config";

type Props = {
  slug: string;
  title: string;
};

const ShareBtns: React.FC<Props> = ({ slug, title }) => {
  const pageUrl = `${config.siteRoot}/${slug}`;
  const postTitle = encodeURIComponent(`${title} | Kenzo Blog`);
  return (
    <div className="btnsWrapper mt-5 text-center">
      <a
        href={`https://twitter.com/share?url=${pageUrl}&text=${postTitle}&via=kenzoooooB`}
        rel="nofollow"
        target="_blank"
        className="p-1 text-center no-underline inline-block text-white truncate align-middle font-bold bg-black text-xl w-10 h-10 leading-10 rounded-full"
      >
        <img src="/images/twitter-white.svg" alt="Twitter" />
      </a>
      <a
        href={`https://www.facebook.com/share.php?u=${pageUrl}`}
        rel="nofollow"
        target="_blank"
        className="mx-3 text-center no-underline inline-block text-white truncate align-middle font-bold bg-black text-xl w-10 h-10 leading-10 rounded-full"
      >
        F
      </a>
      <a
        href={`http://b.hatena.ne.jp/add?mode=confirm&url=${pageUrl}`}
        className="text-center no-underline inline-block text-white truncate align-middle font-bold bg-black text-xl w-10 h-10 leading-10 rounded-full"
        rel="nofollow"
        target="_blank"
      >
        B!
      </a>
    </div>
  );
};

export default ShareBtns;
