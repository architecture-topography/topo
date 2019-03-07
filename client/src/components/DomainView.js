/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import React, { Component } from "react";
import "react-table/react-table.css";
import Capability from "./Capability";
import PropTypes from "prop-types";
import { Grid, Popup, Card } from "semantic-ui-react";

export default class DomainView extends Component {
  static propTypes = {
    domains: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        capabilities: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.string
          })
        ),
        color: PropTypes.string
      })
    ).isRequired
  };

  validHex(hex) {
    var regex = /#([a-f0-9]{3}){1,2}\b/i;
    return regex.test(hex);
  }

  getDomainColor(domain) {
    const defaultDomainColor = "#AAB7B8";

    let color =
      domain.color && this.validHex(domain.color)
        ? domain.color
        : defaultDomainColor;
    return (domain.color = color);
  }

  displayDomainHeader(domain) {
    return (
      <Popup
        trigger={
          <Card className="system-card" key={domain.id}>
            <Card.Content
              className="domain-name system-card-header"
              header={domain.name}
              style={{
                backgroundColor: this.getDomainColor(domain)
              }}
            />
          </Card>
        }
        content={domain.description}
        hideOnScroll
      />
    );
  }

  displayDomainsCapabilities(domain) {
    return domain.capabilities.map((capability, index) => {
      capability.color = this.getDomainColor(domain);
      return (
        <Grid.Row key={index}>
          {capability ? <Capability {...capability} /> : null}
        </Grid.Row>
      );
    });
  }

  render() {
    const { domains } = this.props;

    return (
      <Grid columns="equal">
        <Grid.Row>
          {domains.map((domain, index) => {
            return (
              <Grid.Column key={index}>
                {this.displayDomainHeader(domain)}
                <Grid.Column key={index}>
                  {this.displayDomainsCapabilities(domain)}
                </Grid.Column>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    );
  }
}
