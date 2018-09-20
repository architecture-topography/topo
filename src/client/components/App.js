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
            systemMapping: [],
            treasureMapData: this.props.config
        };

        console.log('CONFIG:', this.props.config);
    }

    updateSystemMapping(systemMapping) {
        this.setState({
            systemMapping: systemMapping
        }, this.buildDataMapping);
    }

    buildDataMapping() {
        const treasureMapData = DataMapper.mapTreasureMapData(
            _objectDeepClone(this.state.treasureMapData), Array.from(this.state.systemMapping)
        );

        this.setState({
            treasureMapData: treasureMapData
        });

        function _objectDeepClone(object) {
            return JSON.parse(JSON.stringify(object))
        }
    }

    render() {
        const { config } = this.props

        return (
            <div className="App">
              <HashRouter>
                <Switch>
                  <Route exact path="/" render={() => (
                    <Container>
                      <Header />
                      <PlatformView platforms={config.platforms} />
                      <FileDrop updateSystemMapping={this.updateSystemMapping}/>
                    </Container>
                    )}
                  />

                  <Route exact path="/capability/:capabilityId" render={({ match, location }) => (
                    <Container>
                      <Header />
                      {/* Note: capabilities shouldn't be a top-level array - to be removed. */}
                      <CapabilityView capabilities={config.capabilities} capabilityId={match.params.capabilityId} />
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
