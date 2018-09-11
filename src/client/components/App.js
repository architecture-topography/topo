import '../../resources/css/App.css';

import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class App extends Component {

    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(files) {
        console.log("ACCEPTED", files);
    }

    render() {
        return (
            <div className="App">
                <Dropzone onDrop={this.onDrop}>
                    <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>
            </div>
        );
    }
}

export default App;
