import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import Profile from "../profile";

const renderer = createRenderer();
test("profile", () => {
  renderer.render(<Profile />);
  const renderedOutput = renderer.getRenderOutput();
  expect(renderedOutput).toMatchSnapshot();
});
