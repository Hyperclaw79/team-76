import React, { Component } from 'react';
import './App.css';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import NominationForm from './Nomiform';
import FlexGridRowWrap from './FlexGridRowWrap';
import Paper from 'material-ui/Paper'

const iconStyles = {
  marginRight: 500,
  padding: 10
};


class LeftSideHeader extends Component {
  render() {
    return (
      <Paper zDepth={3} style={{backgroundColor: '#262df5',width:"65%",marginRight:"70px"}}>
        <Tabs>
          <Tab
            style={{backgroundColor:"#00c3ff"}}
            icon={<FontIcon className="material-icons" style={iconStyles}>check_circle</FontIcon>}
            label="Vote!">
             <FlexGridRowWrap />  
          </Tab>  
          <Tab
            style={{backgroundColor:"#00c3ff"}}
            icon={<FontIcon className="material-icons" style={iconStyles}>face</FontIcon>}
            label="Nominate!">
              <NominationForm />    
          </Tab>  
          <Tab
            style={{backgroundColor:"#00c3ff"}}
            icon={<FontIcon className="material-icons" style={iconStyles}>grade</FontIcon>}
            label="Results!"
          />
        </Tabs>
        <FontIcon className="material-icons" style={iconStyles}></FontIcon>
      </Paper>
    );
  }
}

export default LeftSideHeader;
