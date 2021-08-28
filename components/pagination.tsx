import React from 'react'
import Link from 'next/link'
import { config } from '../site.config'

type Props = {
  totalCount: number;
}

const Pagination: React.FC<Props> = ({ totalCount }) => {
  const PER_PAGE = config.postsNumPerPage;

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <nav className='relative z-0 inline-flex rounded-md shadow-sm'>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <Link href={`/posts/page/${number}`}>
          <a className='rounded-sm z-10 relative inline-flex items-center px-4 py-2 px-3 border text-sm font-medium' key={index}>
            {number}
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default Pagination;
