/**
 * Copyright 2018 Thoughtworks Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import "../resources/css/App.css";

import { HashRouter, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";
import PlatformView from "./PlatformView";
import PlatformViewContainer from "./PlatformViewContainer";
import CapabilityView from "./CapabilityView";
import DataMapper from "../helpers/dataMapper";
import Header from "./Header";
import ErrorBoundary from "./ErrorBoundary";
import { Container } from "semantic-ui-react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treasureMapData: {}
    };
  }

  componentWillMount() {
    this.mapSystemsToCapabilities();
  }

  mapSystemsToCapabilities() {
    const treasureMapData = this.buildDataMapping(this.props.systems);

    this.setState(
      {
        treasureMapData: treasureMapData
      },
      this._logInputData
    );
  }

  _logInputData() {
    console.log("CONFIG:", this.props.config);
    console.log("SYSTEMS:", this.props.systems);
    console.log("TREASURE MAP:", this.state.treasureMapData);
  }

  buildDataMapping(systemMapping) {
    function _deepClone(object) {
      return JSON.parse(JSON.stringify(object));
    }

    try {
      return DataMapper.buildTreasureMapData(
        _deepClone(this.props.config),
        _deepClone(systemMapping)
      );
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <ErrorBoundary
        message={"Please make sure your data is properly formatted."}
      >
        <div>
          <PlatformViewContainer />
        </div>
        <div className="App">
          <HashRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Container>
                    <Header />
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
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        domains: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            capabilities: PropTypes.arrayOf(
              PropTypes.shape({
                name: PropTypes.string.isRequired,
                order: PropTypes.number
              })
            )
          })
        )
      })
    ),
    others: PropTypes.array
  }),
  systems: PropTypes.shape({
    assets: PropTypes.arrayOf(PropTypes.object).isRequired
  })
};

export default App;
