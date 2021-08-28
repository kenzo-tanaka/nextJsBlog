import { NextPage } from "next";
import { getSortedPostsData } from '../../../lib/posts'
import { PostData } from '@types';
import { config } from '../../../site.config'
import { PageSEO } from "../../../components/pageSEO";
import Layout from "../../../components/layout";
import PostsContainer from "../../../components/postsContainer";
import Pagination from '../../../components/pagination'

export async function getStaticProps({ params }: { params: { id: string } }) {
  const current = parseInt(params.id)
  const start: number = (parseInt(params.id) - 1) * config.postsNumPerPage;
  const end: number = parseInt(params.id) * config.postsNumPerPage;
  const totalCount = getSortedPostsData().length;
  const PostsData = getSortedPostsData().slice(start, end);
  return {
    props: {
      current,
      totalCount,
      PostsData,
    },
  };
};

export const getStaticPaths = async () => {
  // @see https://blog.microcms.io/next-pagination/
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)
  const totalCount = getSortedPostsData().length
  const paths = range(1, Math.ceil(totalCount / config.postsNumPerPage)).map((repo) => `/posts/page/${repo}`)

  return {
    paths: paths,
    fallback: false,
  };
};

type Props = {
  current: number
  totalCount: number
  PostsData: PostData[]
}

const PaginationPage: NextPage<Props> = ({ current, totalCount, PostsData }) => {
  return (
    <Layout home>
      <PageSEO title={config.siteMeta.title} />
      <div className="p-5">
        <PostsContainer posts={PostsData} />
        <div className="text-center">
          <Pagination totalCount={totalCount} current={current} />
        </div>
      </div>
    </Layout>
  )
}

export default PaginationPage;
