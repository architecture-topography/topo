/**
 * Copyright 2018 Thoughtworks Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import './resources/css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/components/App';
import registerServiceWorker from './client/registerServiceWorker';
import { getResource } from './client/actions/resourceLoaderApi';
import ErrorBoundary from './client/components/ErrorBoundary';

const pathToConfigFile = process.env.REACT_APP_CONFIG_FILE;
const pathToAssetsFile = process.env.REACT_APP_ASSETS_FILE;

Promise.all([getResource(pathToConfigFile), getResource(pathToAssetsFile)])
  .then(([config, assets]) => {
    renderDom(<App config={config} systems={assets} />);
    registerServiceWorker();
  })
  .catch(error => {
    renderDom(
      <ErrorBoundary message={error.toString()} displayError={true}>
        <p />
      </ErrorBoundary>
    );
    console.error(error);
  });

function renderDom(rootElement) {
  return ReactDOM.render(rootElement, document.getElementById('root'));
}
