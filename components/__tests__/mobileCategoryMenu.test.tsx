import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
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
const renderer = createRenderer();

test("MobileCategoryMenu", () => {
  renderer.render(<MobileCategoryMenu />);
  const renderedOutput = renderer.getRenderOutput();
  expect(renderedOutput).toMatchSnapshot();
});
