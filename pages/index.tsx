import { NextPage } from "next";
import Layout from "../components/layout";
import Profile from "../components/profile";
import PostsList from "../components/postsList";
import CategoryMenu from "../components/categoryMenu";
import MobileCategoryMenu from "../components/MobileCategoryMenu";
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
      <div className="shadow-md p-5">
        <Profile />
        <MobileCategoryMenu />
        <hr className="my-5 hidden sm:block" />
        <div className="grid grid-cols-6 gap-4">
          <div className="hidden md:block">
            <CategoryMenu />
          </div>
          <div className="col-span-6 md:col-span-5">
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
