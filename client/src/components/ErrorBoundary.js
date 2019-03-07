/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import styles from './ErrorBoundary.module.css';
import React from 'react';
import PropTyes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      info: null,
    };
  }

  componentDidCatch(error, info) {
    this.setState(
      {
        hasError: true,
        error: error,
        info: info,
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
        <div className={styles.container}>
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
  displayError: PropTyes.bool,
};

export default ErrorBoundary;
