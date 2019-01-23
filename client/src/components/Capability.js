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
import { Segment } from "semantic-ui-react";
import "../resources/css/Topo.css";

export default class Capability extends Component {
  getSegment(id, color, className, content) {
    const capabilityLink = id ? `#/capability/${id}` : "";
    return (
      <Segment
        style={{ borderColor: color, borderStyle: "solid" }}
        className={className}
        content={<a href={capabilityLink}>{content}</a>}
      />
    );
  }

  render() {
    const { name, color, id } = this.props;

    return this.getSegment(
      id,
      color,
      "capability-name full-width-height",
      name
    );
  }
}
