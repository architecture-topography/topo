import '../../resources/css/App.css';

import { HashRouter, Switch, Route } from 'react-router-dom';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PlatformView from './PlatformView';
import CapabilityView from './CapabilityView';
import FileDrop from './FileDrop';
import DataMapper from '../helpers/dataMapper';
import Header from './Header';
import { Container } from 'semantic-ui-react';

class App extends Component {
    static propTypes = {
        config: PropTypes.shape({
            platforms: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired,
                domains: PropTypes.arrayOf(PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    description: PropTypes.string.isRequired,
                    capabilities: PropTypes.arrayOf(PropTypes.shape({
                        name: PropTypes.string.isRequired,
                        order: PropTypes.number
                    }))
                }))
            })),
            others: PropTypes.array
        })
    };

    constructor(props) {
        super(props);

        this.updateSystemMapping = this.updateSystemMapping.bind(this);

        this.state = {
            configMapping: this.props.config,
            treasureMapData: this.props.config
        };
    }

    updateSystemMapping(systemMapping) {
        const treasureMapData = this.buildDataMapping(systemMapping);

        this.setState({
            treasureMapData: treasureMapData
        });
    }

    buildDataMapping(systemMapping) {
        function _deepClone(object) {
            return JSON.parse(JSON.stringify(object))
        }

        try {
            return DataMapper.mapTreasureMapData(_deepClone(this.state.treasureMapData), _deepClone(systemMapping));
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="App">
              <HashRouter>
                <Switch>
                  <Route exact path="/" render={() => (
                    <Container>
                      <Header />
                      <PlatformView treasureMapData={this.state.treasureMapData} />
                      <FileDrop updateSystemMapping={this.updateSystemMapping}/>
                    </Container>
                    )}
                  />

                  <Route exact path="/capability/:capabilityId" render={({ match }) => (
                    <Container>
                      <Header />
                      {/* Note: capabilities shouldn't be a top-level array - to be removed. */}
                      <CapabilityView treasureMapData={this.state.treasureMapData} capabilityId={match.params.capabilityId} />
                    </Container>
                    )}
                  />
                </Switch>
              </HashRouter>
          </div>
        );
    }
}

export default App;
