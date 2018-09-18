import '../../resources/css/App.css';

import React, {Component} from 'react';
import FileDrop from './FileDrop';
import PropTypes from "prop-types";
import DataMapper from '../helpers/dataMapper';
import MainDisplay from './MainDisplay';

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
            treasureMapData: []
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
            Object.assign({}, this.props.config),
            Array.from(this.state.systemMapping)
        );

        this.setState({
            treasureMapData: treasureMapData
        })

        console.log('TREASURE MAP DATA', treasureMapData);
    }

    render() {
        return (
            <div className="App">
                <MainDisplay treasureMapData={this.state.treasureMapData}/>
                <FileDrop updateSystemMapping={this.updateSystemMapping}/>

                <b>Accepted Files:</b>
                {this.state.systemMapping.map((system, index) => (
                    <div key={index}>
                        {JSON.stringify(system)}
                    </div>
                ))}
            </div>
        );
    }
}

export default App;
