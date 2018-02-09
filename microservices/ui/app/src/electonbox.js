import React, { Component } from 'react';
import EventBox from './eventbox';
import ProfileBox from './profilebox';
//import RightSideHeader from './RightSideHeader';

class ElectonBox extends Component {
  render() {
    return (
      <div style={{display: "flex", flexWrap:"wrap", paddingLeft:"25px"}}>
        <EventBox />
        <ProfileBox />
      </div>
    );
  }
}

export default ElectonBox;
