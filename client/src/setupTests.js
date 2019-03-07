/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import { configure, shallow, mount } from "enzyme";
import "jest-enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
