import React, { Component } from 'react';


export default class Domain extends Component {

 constructor(props){
  super(props);
 }

   render() {

    const {title, content } = this.props;

    return (
        <div>
            <span className="domain-title"> { title } </span>
            { content }
        </div>
    )
   }
}
