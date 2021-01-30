import { NextPage } from "next";
import Link from "next/link";
import Date from "../components/date";
import Layout from "../components/layout";
import { PageSEO } from "../components/pageSEO";
import { config } from "../site.config";
import utilStyles from "../styles/utils.module.css";
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

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Articles</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ slug, date, title }) => (
            <li className={utilStyles.listItem} key={slug}>
              <Link href={`/posts/${slug}`}>
                <a className={`${utilStyles.textBold} ${utilStyles.textBlack}`}>
                  {title}
                </a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
