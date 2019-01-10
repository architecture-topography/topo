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

import "../resources/css/ErrorBoundary.css";

import React from "react";
import PropTyes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      info: null
    };
  }

  componentDidCatch(error, info) {
    this.setState(
      {
        hasError: true,
        error: error,
        info: info
      },
      this._logError
    );
  }

  _logError() {
    console.error(this.state.error.toString());
    console.info(this.state.info.componentStack);
  }

  render() {
    if (this.state.hasError || this.props.displayError) {
      return (
        <div className="ErrorBoundary">
          <h1>Oops!!! Something went wrong...</h1>
          <h2>{this.props.message}</h2>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

ErrorBoundary.propTypes = {
  message: PropTyes.string.isRequired,
  displayError: PropTyes.bool
};

export default ErrorBoundary;
