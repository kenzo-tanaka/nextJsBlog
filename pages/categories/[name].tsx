import { NextPage } from "next";
import Layout from "../../components/layout";
import PostsList from "../../components/postsList";
import Profile from "../../components/profile";
import CategoryMenu from "../../components/categoryMenu";
import MobileCategoryMenu from "../../components/mobileCategoryMenu";
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
      <div className="shadow-md p-5">
        <Profile />
        <MobileCategoryMenu />
        <hr className="my-5 hidden sm:block" />
        <div className="grid grid-cols-6 gap-4">
          <div className="hidden md:block">
            <CategoryMenu />
          </div>
          <div className="col-span-6 md:col-span-5">
            <PostsList heading="" posts={posts} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
