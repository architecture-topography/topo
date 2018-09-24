import '../../resources/css/App.css';

import { HashRouter, Switch, Route } from 'react-router-dom';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PlatformView from './PlatformView';
import CapabilityView from './CapabilityView';
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
        }),
        systems: PropTypes.shape({
            assets: PropTypes.arrayOf(PropTypes.object).isRequired
        })
    };

    constructor(props) {
        super(props);

        this.state = {
            treasureMapData: {}
        };

        console.log('CONFIG:', this.props.config);
        console.log('SYSTEMS:', this.props.systems);
    }

    componentWillMount(){
        this.mapSystemsToCapabilities();
    }

    mapSystemsToCapabilities() {
        const treasureMapData = this.buildDataMapping(this.props.systems);

        console.log('TREASURE MAP:', treasureMapData);

        this.setState({
            treasureMapData: treasureMapData
        });
    }

    buildDataMapping(systemMapping) {
        function _deepClone(object) {
            return JSON.parse(JSON.stringify(object))
        }

        try {
            return DataMapper.buildTreasureMapData(_deepClone(this.props.config), _deepClone(systemMapping));
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
                    </Container>
                    )}
                  />

                  <Route exact path="/capability/:capabilityId" render={({ match }) => (
                    <Container>
                      <Header />
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
