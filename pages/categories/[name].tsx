import { NextPage } from "next";
import Link from "next/link";
import Date from "../../components/date";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { PageSEO } from "../../components/pageSEO";
import { getCategoryPosts, getCategoryNames } from "../../lib/categories";
import { PostData } from "@types";

type Props = {
  categoryName: string;
  posts: PostData[];
};

export async function getStaticProps({ params }: { params: { name: string } }) {
  const posts = await getCategoryPosts(params.name);
  return {
    props: {
      categoryName: params.name,
      posts,
    },
  };
}

export const getStaticPaths = async () => {
  const paths = getCategoryNames();
  return {
    paths,
    fallback: false,
  };
};

const Category: NextPage<Props> = ({ posts, categoryName }) => {
  return (
    <Layout>
      <PageSEO title={categoryName} slug={`categories/${categoryName}`} />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>{categoryName}</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ slug, date, title }) => (
            <li className={utilStyles.listItem} key={slug}>
              <Link href={`/posts/${slug}`}>
                <a className={`${utilStyles.textBold} ${utilStyles.titleText}`}>
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

export default Category;
