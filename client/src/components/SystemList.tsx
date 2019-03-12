/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import React, { Component } from 'react';
import SystemItem from './SystemItem/SystemItem';
import { ITechnology } from './SystemItem/Technologies';

interface ISystem {
  id: number;
  name: string;
  technologies: ITechnology[];
}
interface ISystemListProps {
  systems: ISystem[];
}

class SystemList extends Component<ISystemListProps, any> {
  public static defaultProps = {
    systems: [],
  };

  public render() {
    return this.props.systems.map(system => {
      return (
        <SystemItem
          key={system.id}
          name={system.name}
          technologies={system.technologies}
        />
      );
    });
  }
}

export default SystemList;
