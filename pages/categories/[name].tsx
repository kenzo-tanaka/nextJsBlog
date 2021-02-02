import { NextPage } from "next";
import Layout from "../../components/layout";
import PostsList from "../../components/postsList";
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
      <PostsList heading={categoryName} posts={posts} />
    </Layout>
  );
};

export default Category;
