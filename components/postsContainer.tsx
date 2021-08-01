import React from "react";
import Profile from "./profile";
import MobileCategoryMenu from "./mobileCategoryMenu";
import CategoryMenu from "./categoryMenu";
import Link from "next/link";
import Date from "./date";
import { PostData } from "@types";

type Props = {
  posts: PostData[];
};

const PostsContainer: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <Profile />
      <MobileCategoryMenu />
      <hr className="my-5 hidden sm:block" />
      <div className="grid grid-cols-6 gap-4">
        <div className="hidden md:block">
          <CategoryMenu />
        </div>
        <div className="col-span-6 md:col-span-5">
          <section>
            <ul>
              {posts.map(({ slug, date, title }) => (
                <li className="mb-6" key={slug}>
                  <Link href={`/posts/${slug}`}>
                    <a className="text-lg font-semibold text-gray-800 visited:text-gray-600">
                      {title}
                    </a>
                  </Link>
                  <br />
                  <small className="text-sm font-normal text-gray-400">
                    <Date dateString={date} />
                  </small>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default PostsContainer;
