import { NextPage } from "next";
import { getSortedPostsData } from '../../../lib/posts'
import { PostData } from '@types';
import { config } from '../../../site.config'
import { PageSEO } from "../../../components/pageSEO";
import Layout from "../../../components/layout";
import PostsContainer from "../../../components/postsContainer";
import Pagenation from '../../../components/pagination'

export async function getStaticProps({ params }: { params: { id: number } }) {
  const start: number = (params.id - 1) * config.postsNumPerPage;
  const end: number = params.id * config.postsNumPerPage;
  const PostsData = getSortedPostsData().slice(start, end);
  return {
    props: {
      PostsData,
    },
  };
};

export const getStaticPaths = async () => {
  // @see https://blog.microcms.io/next-pagination/
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)
  const paths = range(1, Math.ceil(60 / config.postsNumPerPage)).map((repo) => `/posts/page/${repo}`)

  return {
    paths: paths,
    fallback: false,
  };
};

type Props = {
  PostsData: PostData[]
}

const PaginationPage: NextPage<Props> = ({ PostsData }) => {
  return (
    <Layout home>
      <PageSEO title={config.siteMeta.title} />
      <div className="p-5">
        <PostsContainer posts={PostsData} />
        <div className="text-center">
          <Pagenation totalCount={60} />
        </div>
      </div>
    </Layout>
  )
}

export default PaginationPage;
