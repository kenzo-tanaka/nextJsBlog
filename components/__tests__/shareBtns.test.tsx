import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import ShareBtns from "../shareBtns";

const renderer = createRenderer();

test("ShareBtns", () => {
  renderer.render(<ShareBtns slug="test-slug" title="test-title" />);
  const renderedOutput = renderer.getRenderOutput();
  expect(renderedOutput).toMatchSnapshot();
});
