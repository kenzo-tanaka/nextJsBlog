import React from "react";
import Profile from "./profile";
import MobileCategoryMenu from "./mobileCategoryMenu";
import CategoryMenu from "./categoryMenu";
import PostsList from "./postsList";
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
          <PostsList posts={posts} />
        </div>
      </div>
    </>
  );
};

export default PostsContainer;
