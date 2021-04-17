import React from "react";
import renderer from "react-test-renderer";
import Profile from "../profile";

test("profile", () => {
  const component = renderer.create(<Profile />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
