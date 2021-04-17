import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import PostsContainer from "../postsContainer";
import { PostData } from "@types";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

const posts: PostData[] = [
  {
    slug: "test-slug",
    title: "Test title",
    date: "2021-04-17",
    content: "This is a test post",
    category: "work",
  },
];
const renderer = createRenderer();

test("PostsContainer", () => {
  renderer.render(<PostsContainer posts={posts} />);
  const renderedOutput = renderer.getRenderOutput();
  expect(renderedOutput).toMatchSnapshot();
});
