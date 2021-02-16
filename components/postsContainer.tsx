import Profile from "./profile";
import MobileCategoryMenu from "./mobileCategoryMenu";
import CategoryMenu from "./categoryMenu";
import PostsList from "./postsList";
import { PostData } from "@types";

type Props = {
  posts: PostData[];
};

const NavBar: React.FC<Props> = ({ posts }) => {
  return (
    <div className="shadow-md p-5">
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
    </div>
  );
};

export default NavBar;
