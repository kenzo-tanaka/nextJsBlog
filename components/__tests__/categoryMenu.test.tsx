import React from "react";
import renderer from "react-test-renderer";
import CategoryMenu from "../categoryMenu";

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

test("CategoryMenu", () => {
  const component = renderer.create(<CategoryMenu />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
