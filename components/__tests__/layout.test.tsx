import React from "react";
import renderer from "react-test-renderer";
import Layout from "../layout";

test("Navbar", () => {
  const component = renderer.create(<Layout children={""} />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
