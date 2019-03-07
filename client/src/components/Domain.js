/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Capability from './Capability';
import '../resources/css/Topo.css';

export default class Domain extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    capabilities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        order: PropTypes.number.isRequired,
        id: PropTypes.string,
      })
    ),
    color: PropTypes.string,
  };

  render() {
    const { name, description, capabilities } = this.props;
    const defaultDomainColor = '#AAB7B8';
    const color =
      this.props.color && this.validHex(this.props.color)
        ? this.props.color
        : defaultDomainColor;
    let orderedCapabilities = capabilities.sort((a, b) => {
      return a.order - b.order;
    });
    return (
      <Container>
        <Segment inverted style={{ backgroundColor: color }}>
          <span className="domain-name">{name}</span> <br />
          <span className="domain-desc">"{description}"</span>
        </Segment>

        {orderedCapabilities.map(capability => {
          return (
            <Capability key={capability.order} color={color} {...capability} />
          );
        })}
      </Container>
    );
  }

  validHex(hex) {
    var regex = /#([a-f0-9]{3}){1,2}\b/i;
    return regex.test(hex);
  }
}
