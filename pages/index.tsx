import { NextPage } from "next";
import Layout from "../components/layout";
import PostsContainer from "../components/postsContainer";
import Search from "../components/search";
import { PageSEO } from "../components/pageSEO";
import { config } from "../site.config";
import { getSortedPostsData } from "../lib/posts";
import { PostData } from "@types";
import { useEffect } from "react";

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
  useEffect(() => {
    document
      .querySelector(".ais-SearchBox-input")
      ?.addEventListener("focus", () => {
        const searchResult = document.querySelector(".search-result");
        searchResult.style.display = "block";
      });
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto my-3 px-2 sm:px-6 lg:px-8">
        <Search />
      </div>
      <Layout home>
        <PageSEO title={config.siteMeta.title} />
        <div className="p-5">
          <PostsContainer posts={allPostsData} />
        </div>
      </Layout>
    </>
  );
};

export default Home;
