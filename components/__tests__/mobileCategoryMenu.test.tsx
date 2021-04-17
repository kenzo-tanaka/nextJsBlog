import React from "react";
import renderer from "react-test-renderer";
import MobileCategoryMenu from "../mobileCategoryMenu";

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
  const component = renderer.create(<MobileCategoryMenu />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
