/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import '../resources/css/App.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import '../resources/css/Topo.css';
import topo_logo from '../resources/img/Topo-02.png';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Image
          src={topo_logo}
          className="topo-logo"
          as={Link}
          to="/"
          wrapped
          spaced
        />
        <p />
      </div>
    );
  }
}

export default Header;
