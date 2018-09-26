import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment } from 'semantic-ui-react'
import '../../resources/css/Topo.css';

export default class Capability extends Component {

  getSegment(id, color, className, content) {
    const capabilityLink = id ? `/capability/${id}` : null;
    return (
      <Segment as={ id ? Link : '' } to={capabilityLink} style={{ borderColor: color,  borderStyle: 'solid' }} className={ className }>
        {content}
      </Segment>
    )
  }

  render() {
    const { name, color, id } = this.props;

    return this.getSegment(id, color, 'capability-name full-width-height', name);
  }
}
