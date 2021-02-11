import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import { getPageData } from "../lib/page";
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
  };
};

const About: NextPage<Props> = ({ pageData }) => {
  return (
    <Layout>
      <Head>
        <title>{pageData.title}</title>
      </Head>
      <div className="markdown-body p-7">
        <ReactMarkdown plugins={[gfm]} children={pageData.content} />
      </div>
    </Layout>
  );
};

export default About;
