import { shallow } from "enzyme";
import * as React from "react";
import Profile from "../components/profile";

describe("Profile", () => {
  const wrapper = shallow(<Profile />);
  expect(wrapper.find("p")).toHaveLength(1);
});
