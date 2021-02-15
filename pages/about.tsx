import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import { getPageData } from "../lib/page";
import { isURL } from "./posts/[slug]";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export async function getStaticProps() {
  const pageData = await getPageData("about");
  return {
    props: {
      pageData,
    },
  };
}

type Props = {
  pageData: {
    title: string;
    content: string;
    slug: string;
  };
};

const About: NextPage<Props> = ({ pageData }) => {
  const { slug, title, content } = pageData;

  const Img = ({ alt, src }: { alt: string; src: string }) => {
    return (
      <picture>
        <img
          src={isURL(src) ? src : require(`../contents/pages/${slug}/${src}`)}
          alt={alt}
        />
      </picture>
    );
  };

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="markdown-body p-7 shadow-md mt-8">
        <ReactMarkdown
          renderers={{ image: Img }}
          plugins={[gfm]}
          children={content}
        />
      </div>
    </Layout>
  );
};

export default About;
