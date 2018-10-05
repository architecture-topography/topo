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

import '../../resources/css/App.css';

import React, {Component} from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../resources/css/Topo.css'
import topo_logo from '../../resources/img/Topo-02.png'

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <Image src={ topo_logo } className='topo-logo' as={Link} to='/' wrapped spaced />
                <p />
            </div>
        );
    }
}

export default Header;
