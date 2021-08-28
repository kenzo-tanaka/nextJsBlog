import React from 'react'
import Link from 'next/link'
import { config } from '../site.config'

type Props = {
  totalCount: number;
  current: number;
}

const Pagination: React.FC<Props> = ({ totalCount, current }) => {
  const PER_PAGE = config.postsNumPerPage;

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <nav className='relative'>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <div className="mx-1 inline-block" key={index}>
          <Link href={`/posts/page/${number}`}>
            <a className={`${current === number ? 'bg-gray-100 border-gray-500' : ''} rounded-sm z-10 relative inline-flex items-center px-4 py-2 px-3 border border-gray-300 text-sm font-medium`}>
              {number}
            </a>
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Pagination;
