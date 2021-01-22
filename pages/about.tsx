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

export default function About({ pageData }) {
  return (
    <Layout>
      <Head>
        <title>{pageData.title}</title>
      </Head>
      <ReactMarkdown plugins={[gfm]} children={pageData.content} />
    </Layout>
  );
}