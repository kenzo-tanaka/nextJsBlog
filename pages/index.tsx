import { NextPage } from "next";
import Layout from "../components/layout";
import PostsContainer from "../components/postsContainer";
import Search from "../components/search";
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
      <Search />
      <div className="p-5">
        <PostsContainer posts={allPostsData} />
      </div>
    </Layout>
  );
};

export default Home;
