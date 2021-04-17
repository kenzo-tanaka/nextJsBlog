import React from "react";
import renderer from "react-test-renderer";
import { PageSEO } from "../components/pageSEO";

test("pageSEO", () => {
  const component = renderer.create(
    <PageSEO title="test-title" slug="test-slug" />
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
