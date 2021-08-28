import React from 'react'
import Link from 'next/link'
import { config } from '../site.config'
import { useRouter } from "next/router";

type Props = {
  totalCount: number;
}

const Pagination: React.FC<Props> = ({ totalCount }) => {
  const router = useRouter();
  const PER_PAGE = config.postsNumPerPage;

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <nav className='relative rounded-md shadow-sm'>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <div className="mx-1 inline-block">
          <Link href={`/posts/page/${number}`}>
            <a className={`rounded-sm z-10 relative inline-flex items-center px-4 py-2 px-3 border border-gray-300 text-sm font-medium ${(router.asPath !== '/' && parseInt(router.asPath.match(/\d+/)[0]) === number) ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : ''}`} key={index}>
              {number}
            </a>
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Pagination;
