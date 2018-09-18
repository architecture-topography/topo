import './resources/css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/components/App';
import registerServiceWorker from './client/registerServiceWorker';

const mappingConfig = JSON.parse(process.CONFIG_FILE_MAPPING);

ReactDOM.render(<App config={mappingConfig} />, document.getElementById('root'));
registerServiceWorker();
