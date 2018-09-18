import '../../resources/css/App.css';

import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import DomainView from './DomainView';

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
        this.onDrop = this.onDrop.bind(this);

        this.state = ({ content: undefined })
        console.log(JSON.stringify(props.config));
    }

    onDrop(files) {
        console.log("ACCEPTED", files);

        this.setState({
            domains: [
                      {
                        "name": "Domain 1",
                        "description": "Description 1",
                        "capabilities": [
                          {"name": "Capability 1", "order": 1},
                          {"name": "Capability 2", "order": 2},
                          {"name": "Capability 3", "order": 3}
                        ]
                      },
                      {
                        "name": "Domain 2",
                        "description": "Description something",
                        "capabilities": [
                          {"name": "Capability 1", "order": 1},
                        ]
                      },
                      {
                        "name": "Domain 3",
                        "description": "Description something",
                        "capabilities": [
                          {"name": "Capability 1", "order": 1},
                          {"name": "Capability 2", "order": 2},
                          {"name": "Capability 3", "order": 3},
                          {"name": "Capability 4", "order": 4},
                          {"name": "Capability 5", "order": 5},
                        ]
                      },
                      {
                        "name": "Domain 4",
                        "description": "Description something",
                        "capabilities": [
                          {"name": "Capability 1", "order": 1},
                          {"name": "Capability 2", "order": 2},
                        ]
                      },
                      {
                        "name": "Domain 5",
                        "description": "Description something",
                        "capabilities": [
                          {"name": "Capability 1", "order": 1},
                          {"name": "Capability 2", "order": 2},
                          {"name": "Capability 3", "order": 3},
                          {"name": "Capability 4", "order": 4},
                          {"name": "Capability 5", "order": 5},
                          {"name": "Capability 6", "order": 6},
                          {"name": "Capability 7", "order": 7},
                        ]
                      }
                    ]
              
        })

    }

    render() {
        return (
            <div className="App">
                <Dropzone onDrop={this.onDrop} />
                {
                    this.state.domains ? 
                    (
                        <DomainView domains={this.state.domains} />
                    ) : (
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    )
                }
            </div>   
        );
    }
}

export default App;
