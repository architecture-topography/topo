import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import '../../resources/css/Topo.css';

export default class Capability extends Component {
    render() {
        const { name } = this.props;
        const color = "blue"
        return (
            <Segment inverted color={color} tertiary className="domain-cap" content={name}/>
        )
    }
}
