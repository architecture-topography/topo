import './index.css';

import React, {Component} from 'react';
import Dropzone from 'react-dropzone';


class App extends Component {
    onDrop(files) {
        console.log("ACCEPTED", files);
    }

    render() {
        return (
            <div className="App">
                <Dropzone onDrop={this.onDrop.bind(this)}>
                    <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>
            </div>
        );
    }
}

export default App;
