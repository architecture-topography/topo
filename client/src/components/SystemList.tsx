/**
 * Copyright 2018 Thoughtworks Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from "react";
import SystemItem from "./SystemItem/SystemItem";

interface ISystem {
  id: number;
  name: string;
}
interface ISystemListProps {
  systems: Array<ISystem>;
}

class SystemList extends Component<ISystemListProps, any> {
  static defaultProps = {
    systems: []
  };

  render() {
    return this.props.systems.map(system => {
      return <SystemItem key={system.id} name={system.name} />;
    });
  }
}

export default SystemList;
