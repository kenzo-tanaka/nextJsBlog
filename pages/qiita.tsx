import { NextPage } from "next";
import Layout from "../components/layout";
import { PageSEO } from "../components/pageSEO";
import QiitaPosts from "../contents/qiita/articles.json"
import ExternalPostList from "../components/externalPostList";

const Qiita: NextPage = () => {
  return (
    <Layout home>
      <PageSEO title='Qiitaへの投稿一覧' />
      <div className="p-5">
        <ExternalPostList posts={QiitaPosts} />
      </div>
    </Layout>
  );
};

export default Qiita;
