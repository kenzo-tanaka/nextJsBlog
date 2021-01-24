import styled from "styled-components";
import { config } from "../site.config";

const BtnsWrapper = styled.div`
  margin-top: 1.8em;
  text-align: center;
`;

const SnsBtn = styled.a`
  display: inline-block;
  text-decoration: none;
  width: 50px;
  margin: 2px;
  height: 50px;
  line-height: 50px;
  font-size: 23px;
  color: white;
  border-radius: 50px;
  text-align: center;
  overflow: hidden;
  font-weight: bold;
  transition: 0.3s;
  background: #000;
`;

export default function ShareBtns({ slug, title }) {
  const pageUrl = `${config.siteRoot}/posts/${slug}`;
  const postTitle = encodeURIComponent(`${title} | Kenzo Blog`);
  return (
    <BtnsWrapper>
      <SnsBtn
        href={`https://twitter.com/share?url=${pageUrl}&text=${postTitle}&via=kenzoooooB`}
        rel="nofollow"
        style={{ padding: "4px" }}
      >
        <img
          src="/images/twitter-white.svg"
          alt="Twitter"
          style={{ maxWidth: "44px", margin: "4px", display: "inline-block" }}
        />
      </SnsBtn>
      <SnsBtn
        href={`https://www.facebook.com/share.php?u=${pageUrl}`}
        rel="nofollow"
        style={{ margin: "0 0.5em 0 0.5em" }}
      >
        F
      </SnsBtn>
      <SnsBtn
        href={`http://b.hatena.ne.jp/add?mode=confirm&url=${pageUrl}`}
        rel="nofollow"
      >
        B!
      </SnsBtn>
    </BtnsWrapper>
  );
}
