import React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import Navbar from "../navBar";

const renderer = createRenderer();
test("Navbar", () => {
  renderer.render(<Navbar />);
  const renderedOutput = renderer.getRenderOutput();
  expect(renderedOutput).toMatchSnapshot();
});
