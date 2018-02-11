import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import NominationForm from './nomiform';
import VoteBox from './votebox';
import Paper from 'material-ui/Paper'
import ResultsBox from './resultsbox'

const iconStyles = {
  marginRight: 500,
  padding: 10
};


export default class EventBox extends Component {
  render() {
    return (
      <Paper zDepth={3} 
        style={
          {
            backgroundColor: '#262df5',
            width:"65%",marginRight:"70px",
          }
        }
      >
        <Tabs>
          <Tab
            style={{backgroundColor:"#00c3ff"}}
            icon={<FontIcon className="material-icons" style={iconStyles}>check_circle</FontIcon>}
            label="Vote!">
             <VoteBox />  
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
            label="Results!">
          <ResultsBox />
          </Tab>  
        </Tabs>
        <FontIcon className="material-icons" style={iconStyles}></FontIcon>
      </Paper>
    );
  }
}

