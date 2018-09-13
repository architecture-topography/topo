import '../../resources/css/App.css';

import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import fileParser from '../io/fileParser';

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

        console.log(JSON.stringify(props.config));

        this.state = {
            acceptedFiles: [],
            rejectedFiles: []
        };
    }

    onDrop(acceptedFiles, rejectedFiles) {
        const systems = [];
        acceptedFiles.forEach((file, index) =>
            fileParser(file).then(result => {
                try {
                    systems.push(JSON.parse(result));
                } catch (e) {
                    rejectedFiles.push(file);
                }

                if (index === acceptedFiles.length - 1) {
                    this.onFileProcessed(systems, rejectedFiles);
                }
            }).catch(e => {
                console.log(e);
            })
        )
    }

    onFileProcessed(acceptedFiles, rejectedFiles) {
        console.log('ACCEPTED', acceptedFiles.length);
        console.log('REJECTED', rejectedFiles.length);

        this.setState({
            acceptedFiles: acceptedFiles,
            rejectedFiles: rejectedFiles
        });
    }

    render() {
        return (
            <div className="App">
                <Dropzone accept={'application/json'} onDrop={this.onDrop}>
                    <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>
                <div>
                    <span>
                        Rejected Files
                    </span>
                    {this.state.rejectedFiles.map((file, index) => (
                        <div key={index}>
                            {file.name}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
