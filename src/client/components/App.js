import '../../resources/css/App.css';

import React, {Component} from 'react';
import FileDrop from './FileDrop';
import PropTypes from "prop-types";

class App extends Component {
    static propTypes = {
        config: PropTypes.shape({
            Platforms: PropTypes.arrayOf(PropTypes.shape({
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
            Others: PropTypes.array
        })
    };

    constructor(props) {
        super(props);

        this.updateSystemMapping = this.updateSystemMapping.bind(this);

        this.state = {
            configMapping: this.props.config,
            systemMapping: [],
        };

        console.log('CONFIG:', this.props.config);
    }

    updateSystemMapping(systemMapping) {
        this.setState({
            systemMapping: systemMapping
        }, this.createDataMapping);
    }

    createDataMapping() {
        const domainsToSystemsMapping = Object.assign({}, this.props.config);

        this.state.systemMapping.forEach(system => {
            system.capabilities.forEach(capability => {
                domainsToSystemsMapping.Platforms[0].domains.forEach(domain => {
                    domain.capabilities.forEach(otherCapability => {
                        if (otherCapability.name === capability) {
                            if (!otherCapability.systems) {
                                otherCapability.systems = [];
                            }

                            if (!otherCapability.systems.includes(system)) {
                                otherCapability.systems.push(system);
                            }
                        }
                    });
                });
            })
        });

        console.log(domainsToSystemsMapping);
    }

    render() {
        return (
            <div className="App">
                <FileDrop updateSystemMapping={this.updateSystemMapping}/>

                <b>ACCEPTED:</b>
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
