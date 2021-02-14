import { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import Date from "../../components/date";
import ShareBtns from "../../components/shareBtns";
import PostList from "../../components/postsList";
import { PageSEO } from "../../components/pageSEO";
import { getAllPostSlugs, getPostData } from "../../lib/posts";
import { getCategoryPosts } from "../../lib/categories";
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
  relatedPosts: PostData[];
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
    <div className="markdown-body__codeblock-container">
      {file && (
        <div>
          <span className="markdown-body__codeblock-filename">{file}</span>
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
  const relatedPosts = await (await getCategoryPosts(postData.category))
    .filter((post) => post.slug !== params.slug)
    .slice(0, 3);

  return {
    props: {
      postData,
      relatedPosts,
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

const Post: NextPage<Props> = ({ postData, relatedPosts }) => {
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
      <div className="shadow-md mt-8">
        <div className="p-7">
          <article>
            <small className="text-sm font-normal text-gray-400">
              <Date dateString={date} />
            </small>
            <h1 className="text-3xl font-bold my-3">{title}</h1>
            <Link href={`/categories/${category}`}>
              <a className="text-gray-500 underline">#{category}</a>
            </Link>
            <div className="markdown-body">
              <ReactMarkdown
                renderers={{ code: CodeBlock, image: Img }}
                plugins={[gfm]}
                children={content}
                allowDangerousHtml={true}
              />
            </div>
          </article>
          <ShareBtns slug={slug} title={title} />
          <div className="text-center mt-3">
            <Link
              href={`${config.repo}/edit/main/contents/posts/${slug}/index.md`}
            >
              <a target="_blank" className="text-gray-400">
                Edit on GitHub
              </a>
            </Link>
          </div>
        </div>
        <div className="px-7 pb-2">
          <hr className="mb-8" />
          <h2 className="font-semibold text-gray-800 text-md my-2">関連記事</h2>
          <PostList heading="関連記事" posts={relatedPosts} />
        </div>
      </div>
    </Layout>
  );
};

export default Post;
