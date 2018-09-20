import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Reveal } from 'semantic-ui-react'
import '../../resources/css/Topo.css';

export default class Capability extends Component {

  getSegment(id, color, className, content) {
    const capabilityLink = id ? `/capability/${id}` : null;
    return (
      <Segment as={ id ? Link : '' } to={capabilityLink} inverted padded style={{ backgroundColor: color, display: 'block' }} className={ className }>
        {content}
      </Segment>
    )
  }

  render() {
    const { name, description, color, id } = this.props;

    return (
        <Reveal animated='fade'>
          <Reveal.Content visible className='full-width-height'>
            {this.getSegment(id, color, 'full-width-height capability-name', name)}
          </Reveal.Content>
          <Reveal.Content hidden className='full-width-height'>
            {this.getSegment(id, color, 'full-width-height capability-desc', `"${description}"`)}
          </Reveal.Content>
        </Reveal>
    )
  }
}
