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
