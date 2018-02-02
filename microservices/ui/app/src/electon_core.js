import React, { Component } from 'react';
import './App.css';
import LeftSideHeader from './LeftSideHeader';
//import RightSideHeader from './RightSideHeader';

class ElectonBox extends Component {
  render() {
    return (
      <div style={{display: "flex", flexWrap:"wrap", paddingLeft:"25px"}}>
        <LeftSideHeader/>
      </div>
    );
  }
}

export default ElectonBox;
