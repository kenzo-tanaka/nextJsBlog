import { NextPage } from "next";
import Layout from "../components/layout";
import PostsList from "../components/postsList";
import { PageSEO } from "../components/pageSEO";
import { config } from "../site.config";
import { getSortedPostsData } from "../lib/posts";
import { PostData } from "@types";

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
      <div className="shadow-lg p-5">
        <PostsList heading="All" posts={allPostsData} />
      </div>
      <p className="mt-7 text-center">
        <a
          href={config.repo}
          target="_blank"
          className="text-gray-400 underline"
        >
          SourceCode
        </a>
      </p>
    </Layout>
  );
};

export default Home;
