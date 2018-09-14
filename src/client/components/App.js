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

        this.state = {
            acceptedFiles: [],
            rejectedFiles: []
        };
    }

    async onDrop(acceptedFiles, rejectedFiles) {
        const files = {
            accepted: [],
            rejected: rejectedFiles
        };

        const results = await Promise.all(acceptedFiles.map(fileParser)).catch(console.log);

        results.forEach(data => {
            Object.keys(data).forEach(key => files[key].push(data[key]));
        });

        this._onProcessedFiles(files);
    }

    _onProcessedFiles(files) {
        console.log('ACCEPTED', files.accepted.length);
        console.log('REJECTED', files.rejected.length);

        this.setState({
            acceptedFiles: files.accepted,
            rejectedFiles: files.rejected
        });
    }

    render() {
        return (
            <div className="App">
                <div>
                    <Dropzone accept={'application/json'} onDrop={this.onDrop}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
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
