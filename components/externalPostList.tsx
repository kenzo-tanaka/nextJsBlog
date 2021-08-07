import React from "react";
import Profile from "./profile";
import MobileCategoryMenu from "./mobileCategoryMenu";
import CategoryMenu from "./categoryMenu";
import Date from "./date";
import { ExternalPostData } from "@types";

type Props = {
  posts: ExternalPostData[];
};

const ExternalPostList: React.FC<Props> = ({ posts }) => {
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
              {posts.map(({ url, created_at, title }) => (
                <li className="mb-6" key={url}>
                  <a href={url} target='_blank' className="break-words text-lg font-semibold text-gray-800 visited:text-gray-600">
                    {title}
                  </a>
                  <br />
                  <small className="text-sm font-normal text-gray-400">
                    <Date dateString={created_at} />
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

export default ExternalPostList;
