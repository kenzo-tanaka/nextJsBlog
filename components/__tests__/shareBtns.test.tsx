import React from "react";
import renderer from "react-test-renderer";
import ShareBtns from "../shareBtns";

test("ShareBtns", () => {
  const component = renderer.create(
    <ShareBtns slug="test-slug" title="test-title" />
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
