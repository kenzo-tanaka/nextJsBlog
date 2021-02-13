import { NextPage } from "next";
import Layout from "../components/layout";
import Profile from "../components/profile";
import PostsList from "../components/postsList";
import CategoryMenu from "../components/categoryMenu";
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
      <div className="shadow-lg p-5 divide-solid">
        <Profile />
        <hr className="my-5" />
        <div className="grid grid-cols-6 gap-4">
          <CategoryMenu />
          <div className="col-span-5">
            <PostsList heading="All" posts={allPostsData} />
          </div>
        </div>
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
