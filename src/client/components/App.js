import '../../resources/css/App.css';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PlatformView from './PlatformView';
import FileDrop from './FileDrop';
import DataMapper from '../helpers/dataMapper';
import MainDisplay from './MainDisplay';
import { platform } from 'os';

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
                <FileDrop updateSystemMapping={this.updateSystemMapping}/>
                <b>Accepted Files:</b>
                {this.state.systemMapping.map((system, index) => (
                    <div key={index}>
                        {JSON.stringify(system)}
                    </div>
                ))}
                <PlatformView platforms={config.platforms} />
                
            </div>
        );
    }
}

export default App;
