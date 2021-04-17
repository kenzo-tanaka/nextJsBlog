import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import PostsList from "../postsList";
import { PostData } from "@types";

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

test("PostsList", () => {
  renderer.render(<PostsList posts={posts} />);
  const renderedOutput = renderer.getRenderOutput();
  expect(renderedOutput).toMatchSnapshot();
});
