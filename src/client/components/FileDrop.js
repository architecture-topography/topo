import '../../resources/css/App.css';

import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import fileParser from '../io/fileParser';

class FileDrop extends Component {
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
            <div className="DropFile">
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
        );
    }
}

export default FileDrop;
