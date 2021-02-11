import { NextPage } from "next";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Date from "./date";
import { PostData } from "@types";

type Props = {
  heading: string;
  posts: PostData[];
};

const PostsList: NextPage<Props> = ({ posts, heading }) => {
  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <ul className={utilStyles.list}>
        {posts.map(({ slug, date, title, category }) => (
          <li className="mt-3" key={slug}>
            <Link href={`/posts/${slug}`}>
              <a className="text-lg font-semibold text-gray-800">{title}</a>
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
