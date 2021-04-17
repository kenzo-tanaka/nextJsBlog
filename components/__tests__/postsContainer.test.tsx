import React from "react";
import renderer from "react-test-renderer";
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

test("CategoryMenu", () => {
  const component = renderer.create(<PostsContainer posts={posts} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
