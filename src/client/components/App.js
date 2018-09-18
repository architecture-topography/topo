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
            config: "yes"
        })

    }

    render() {
        return (
            <div className="App">
                <Dropzone onDrop={this.onDrop} />
                {
                    this.state.config ? 
                    (
                        // <DomainView domains={this.state} />
                        <p>hi</p>
                    ) : (
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    )
                }
            </div>   
        );
    }
}

export default App;
