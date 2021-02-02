import { NextPage } from "next";
import Link from "next/link";
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
      <p>
        2019年からEXestという会社で、動画サービスの開発をしています。
        業務ではRailsを扱っていますが、JavaScriptが好きです。詳しい経歴は
        <Link href={"/about"}>
          <a>こちら</a>
        </Link>
        。
      </p>
      <PostsList heading="All" posts={allPostsData} />
    </Layout>
  );
};

export default Home;
