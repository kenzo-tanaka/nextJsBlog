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
      <h2 className={utilStyles.headingLg}>{heading}</h2>
      <ul className={utilStyles.list}>
        {posts.map(({ slug, date, title, category }) => (
          <li className={utilStyles.listItem} key={slug}>
            <Link href={`/posts/${slug}`}>
              <a className={`${utilStyles.textBold} ${utilStyles.titleText}`}>
                {title}
              </a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
            <Link href={`/categories/${category}`}>
              <a className={utilStyles.categoryLabel}>#{category}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostsList;
