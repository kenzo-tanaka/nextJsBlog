import React from "react";
import renderer from "react-test-renderer";
import Profile from "../components/profile";

test("profile", () => {
  const component = renderer.create(<Profile />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
