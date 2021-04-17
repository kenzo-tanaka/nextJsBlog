import React from "react";
import renderer from "react-test-renderer";
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

test("PostsList", () => {
  const component = renderer.create(<PostsList posts={posts} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
