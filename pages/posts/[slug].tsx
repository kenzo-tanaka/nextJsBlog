import Link from "next/link";
import Layout from "../../components/layout";
import Date from "../../components/date";
import ShareBtns from "../../components/shareBtns";
import { PageSEO } from "../../components/pageSEO";
import { getAllPostSlugs, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const renderers = {
  code: ({ language, value }: { language: string; value: string }) => {
    return <SyntaxHighlighter language={language} children={value} />;
  },
};

// Fetch necessary data for the blog post using params.slug
export async function getStaticProps({ params }) {
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

export default function Post({ postData }) {
  return (
    <Layout>
      <PageSEO title={postData.title} slug={`posts/${postData.slug}`} />
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <ReactMarkdown renderers={renderers} children={postData.content} />
      </article>
      <ShareBtns slug={postData.slug} title={postData.title} />
      <div style={{ textAlign: "center", marginTop: "1em" }}>
        <Link
          href={`https://github.com/kenzoukenzou/nextJsBlog/edit/main/contents/posts/${postData.slug}.md`}
        >
          <a target="_blank" style={{ color: "grey" }}>
            Edit on GitHub
          </a>
        </Link>
      </div>
    </Layout>
  );
}
