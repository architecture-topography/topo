import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Reveal } from 'semantic-ui-react'
import '../../resources/css/Topo.css';

export default class Capability extends Component {

    render() {
        const { name, description, color, id } = this.props;
        const square = { width: 175, height: 175 }
        
        // To do: handle case where id is undefined (shouldn't be a link).
        return (
            <Reveal animated='fade'>
              <Reveal.Content visible>
                <Segment as={ Link } to={`/capability/${id}`} circular style={square} inverted padded style={{ backgroundColor: color, display: 'block' }} color={color} tertiary className="domain-cap" content={name}/>
              </Reveal.Content>
              <Reveal.Content hidden>
                <Segment circular style={square} inverted style={{ backgroundColor: color }} color='grey' tertiary className="domain-cap" content={description}/>
              </Reveal.Content>
            </Reveal>
        )
    }
}
