/**
 * @jest-environment node
 */

import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import Frontpage from "./components/Frontpage/Frontpage";

test("Frontpage should render as expected", () => {
  shallow(<Frontpage />);
});
