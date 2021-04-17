import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import Layout from "../layout";

const renderer = createRenderer();
test("Layout", () => {
  renderer.render(<Layout children={""} />);
  const renderedOutput = renderer.getRenderOutput();
  expect(renderedOutput).toMatchSnapshot();
});
