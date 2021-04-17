import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
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

const renderer = createRenderer();
test("CategoryMenu", () => {
  renderer.render(<CategoryMenu />);
  const renderedOutput = renderer.getRenderOutput();
  expect(renderedOutput).toMatchSnapshot();
});
