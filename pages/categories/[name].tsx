import { NextPage } from "next";
import Layout from "../../components/layout";
import PostsContainer from "../../components/postsContainer";
import { PageSEO } from "../../components/pageSEO";
import { getCategoryPosts, getCategoryNames } from "../../lib/categories";
import { PostData } from "@types";
import { config } from "../../site.config";

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
      <PostsContainer posts={posts} />
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

export default Category;
