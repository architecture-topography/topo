import './resources/css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/components/App';
import registerServiceWorker from './client/registerServiceWorker';

ReactDOM.render(<App config={process.CONFIG_FILE_MAPPING} systems={process.SYSTEMS_BUNDLE} />, document.getElementById('root'));
registerServiceWorker();
