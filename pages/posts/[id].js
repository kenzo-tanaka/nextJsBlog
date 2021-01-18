import Layout from "../../components/layout";
import { getAllPostIds } from "../../lib/posts";

export async function Post() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
