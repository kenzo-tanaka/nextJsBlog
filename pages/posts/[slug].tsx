import { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import Date from "../../components/date";
import ShareBtns from "../../components/shareBtns";
import { PageSEO } from "../../components/pageSEO";
import { getAllPostSlugs, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";
import { PostData } from "@types";
import gfm from "remark-gfm";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Skeleton from "react-loading-skeleton";
import { config } from "../../site.config";

type Props = {
  postData: PostData;
};

const CodeBlock = ({
  language,
  value,
}: {
  language: string;
  value: string;
}) => {
  if (language === "twitter") {
    return (
      <TwitterTweetEmbed
        tweetId={value}
        placeholder={<Skeleton height={300} />}
      />
    );
  }

  const [lang, file] = language.split(":");
  return (
    <div className={utilStyles.codeBlockContainer}>
      {file && (
        <div className="code-block-header">
          <span className={utilStyles.codeBlockFilename}>{file}</span>
        </div>
      )}
      <SyntaxHighlighter language={lang} style={style} children={value} />
    </div>
  );
};

const isURL = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

// Fetch necessary data for the blog post using params.slug
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData,
    },
  };
}

// Return a list of possible value for slug
export const getStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

const Post: NextPage<Props> = ({ postData }) => {
  const { slug, title, date, content, category } = postData;

  const Img = ({ alt, src }: { alt: string; src: string }) => {
    return (
      <picture>
        <img
          src={
            isURL(src) ? src : require(`../../contents/posts/${slug}/${src}`)
          }
          alt={alt}
        />
      </picture>
    );
  };

  return (
    <Layout>
      <PageSEO title={title} slug={`posts/${slug}`} />
      <article>
        <small className={utilStyles.lightText}>
          <Date dateString={date} />
        </small>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <Link href={`/categories/${category}`}>
          <a
            className={`${utilStyles.categoryLabel} ${utilStyles.linkUnderline}`}
          >
            #{category}
          </a>
        </Link>
        <ReactMarkdown
          renderers={{ code: CodeBlock, image: Img }}
          plugins={[gfm]}
          children={content}
          allowDangerousHtml={true}
        />
      </article>
      <ShareBtns slug={slug} title={title} />
      <div style={{ textAlign: "center", marginTop: "1em" }}>
        <Link href={`${config.repo}/edit/main/contents/posts/${slug}/index.md`}>
          <a target="_blank" style={{ color: "grey" }}>
            Edit on GitHub
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Post;
