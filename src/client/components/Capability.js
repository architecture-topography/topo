import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Popup } from 'semantic-ui-react'
import '../../resources/css/Topo.css';

export default class Capability extends Component {

  getSegment(id, color, className, content) {
    const capabilityLink = id ? `/capability/${id}` : null;
    return (
      <Segment as={ id ? Link : '' } to={capabilityLink} tertiary inverted padded style={{ backgroundColor: color, display: 'block' }} className={ className }>
        {content}
      </Segment>
    )
  }

  render() {
    const { name, description, color, id } = this.props;
    const desc = description ? `"${description}"` : "No description"

    return (
        <Popup
          trigger={this.getSegment(id, color, 'capability-name', name)}
          size='small'
          position='right center'
        >
          <Popup.Content className='capability-desc'>
            { desc }
          </Popup.Content>
        </Popup>
    )
  }
}
