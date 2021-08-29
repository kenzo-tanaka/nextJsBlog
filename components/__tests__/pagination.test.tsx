import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import Pagination from "../pagination";

const renderer = createRenderer();
test("Navbar", () => {
  renderer.render(<Pagination totalCount={60} current={1} />);
  const renderedOutput = renderer.getRenderOutput();
  expect(renderedOutput).toMatchSnapshot();
});
