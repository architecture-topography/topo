import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import '../../resources/css/Topo.css';

export default class Capability extends Component {
    render() {
        const { name, color } = this.props;
        return (
            <Segment inverted style={{ backgroundColor: color }} color={color} tertiary className="domain-cap" content={name}/>
        )
    }
}
