import { NextPage } from "next";
import Layout from "../components/layout";
import { PageSEO } from "../components/pageSEO";
import { ExternalPostData } from "@types";
import ZennPosts from "../contents/zenn/articles.json"
import ExternalPostList from "../components/externalPostList";

const Zenn: NextPage = () => {
  return (
    <Layout home>
      <PageSEO title='Zennへの投稿一覧' />
      <div className="p-5">
        <ExternalPostList posts={ZennPosts} />
      </div>
    </Layout>
  );
};

export default Zenn;
