/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import '../resources/css/App.css';

import { HashRouter, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlatformView from './PlatformView';
import PlatformViewContainer from './PlatformViewContainer';
import CapabilityView from './CapabilityView';
import DataMapper from '../helpers/dataMapper';
import Header from './Header';
import ErrorBoundary from './ErrorBoundary';
import { Container } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treasureMapData: {},
    };
  }

  componentWillMount() {
    this.mapSystemsToCapabilities();
  }

  mapSystemsToCapabilities() {
    const treasureMapData = this.buildDataMapping(this.props.systems);

    this.setState({
      treasureMapData: treasureMapData,
    });
  }

  buildDataMapping(systemMapping) {
    function _deepClone(object) {
      return JSON.parse(JSON.stringify(object));
    }

    return DataMapper.buildTreasureMapData(
      _deepClone(this.props.config),
      _deepClone(systemMapping)
    );
  }

  render() {
    return (
      <ErrorBoundary
        message={'Please make sure your data is properly formatted.'}
      >
        <div className="App">
          <HashRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Container>
                    <Header />
                    <PlatformViewContainer />
                    <PlatformView
                      treasureMapData={this.state.treasureMapData}
                    />
                  </Container>
                )}
              />

              <Route
                exact
                path="/capability/:capabilityId"
                render={({ match }) => (
                  <Container>
                    <Header />
                    <CapabilityView
                      treasureMapData={this.state.treasureMapData}
                      capabilityId={match.params.capabilityId}
                    />
                  </Container>
                )}
              />
            </Switch>
          </HashRouter>
        </div>
      </ErrorBoundary>
    );
  }
}

App.propTypes = {
  config: PropTypes.shape({
    others: PropTypes.array,
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        domains: PropTypes.arrayOf(
          PropTypes.shape({
            capabilities: PropTypes.arrayOf(
              PropTypes.shape({
                name: PropTypes.string.isRequired,
                order: PropTypes.number,
              })
            ),
            description: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          })
        ),
        name: PropTypes.string.isRequired,
      })
    ),
  }),
  systems: PropTypes.shape({
    assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
};

export default App;
