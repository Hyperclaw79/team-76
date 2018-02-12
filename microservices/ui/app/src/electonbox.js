import React, { Component } from 'react';
import EventBox from './eventbox';
import ProfileBox from './profilebox';
//import RightSideHeader from './RightSideHeader';

class ElectonBox extends Component {
  render() {
    return (
      <div style={{display:this.props.disp, flexWrap:"wrap", paddingLeft:"25px"}}>
        <EventBox user_id={this.props.user_id} />
        <ProfileBox user_id={this.props.user_id} />
      </div>
    );
  }
}

export default ElectonBox;
