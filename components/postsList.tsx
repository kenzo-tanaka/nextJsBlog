import { NextPage } from "next";
import Link from "next/link";
import Date from "./date";
import { PostData } from "@types";

type Props = {
  heading: string;
  posts: PostData[];
};

const PostsList: NextPage<Props> = ({ posts, heading }) => {
  return (
    <section>
      <ul>
        {posts.map(({ slug, date, title }) => (
          <li className="mt-6" key={slug}>
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
  );
};

export default PostsList;
