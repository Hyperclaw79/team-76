import React, { Component } from 'react';
import EventBox from './eventbox';
//import RightSideHeader from './RightSideHeader';

class ElectonBox extends Component {
  render() {
    return (
      <div style={{display: "flex", flexWrap:"wrap", paddingLeft:"25px"}}>
        <EventBox />
      </div>
    );
  }
}

export default ElectonBox;
