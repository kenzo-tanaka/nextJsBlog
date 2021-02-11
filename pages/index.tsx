import { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/layout";
import PostsList from "../components/postsList";
import { PageSEO } from "../components/pageSEO";
import { config } from "../site.config";
import { getSortedPostsData } from "../lib/posts";
import { PostData } from "@types";
import utilStyles from "../styles/utils.module.css";

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

type Props = {
  allPostsData: PostData[];
};

const Home: NextPage<Props> = ({ allPostsData }) => {
  return (
    <Layout home>
      <PageSEO title={config.siteMeta.title} />
      <PostsList heading="All" posts={allPostsData} />
      <p className={utilStyles.alignCenter}>
        <a
          href={config.repo}
          target="_blank"
          className={`${utilStyles.linkUnderline} ${utilStyles.greyText}`}
        >
          SourceCode
        </a>
      </p>
    </Layout>
  );
};

export default Home;
