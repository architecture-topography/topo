import React, { Component } from "react";
import SystemItem from "./SystemItem/SystemItem";

interface ISystem {
  id: number;
  name: string;
}
interface ISystemListProps {
  systems: Array<ISystem>;
}

class SystemList extends Component<ISystemListProps, any> {
  static defaultProps = {
    systems: []
  };

  render() {
    return this.props.systems.map(system => {
      return <SystemItem key={system.id} name={system.name} />;
    });
  }
}

export default SystemList;
