import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import NominationForm from './nomiform';
import VoteBox from './votebox';
import Paper from 'material-ui/Paper'
import ResultsBox from './resultsbox'
import Media from 'react-media';

const iconStyles = {
  marginRight: 500,
  padding: 10
};

export default class EventBox extends React.Component{
  render() {
      return(
          <Media query="(max-width: 1253px)">
              {matches =>
                  matches ? (
                  <ResponsiveEventBox 
                    user_id={this.props.user_id}
                    style={{
                      backgroundColor: '#262df5',
                      width:"90vw",
                      minHeight:"80vh",
                      position:"fixed",
                      margin:"30px auto"
                    }}
                  />
                  ) : (
                  <ResponsiveEventBox 
                    user_id={this.props.user_id} 
                    style={{
                      backgroundColor: '#262df5',
                      width:"65%",
                      marginRight:"70px"
                    }}
                  />
                  )
              }
          </Media>
      );
  }
}

class ResponsiveEventBox extends Component {
  render() {
    return (
      <Paper zDepth={3} style={this.props.style} >
        <Tabs>
          <Tab
            style={{backgroundColor:"#00c3ff"}}
            icon={<FontIcon className="material-icons" style={iconStyles}>check_circle</FontIcon>}
            label="Vote!">
             <VoteBox user_id={this.props.user_id} />  
          </Tab>  
          <Tab
            style={{backgroundColor:"#00c3ff"}}
            icon={<FontIcon className="material-icons" style={iconStyles}>face</FontIcon>}
            label="Nominate!">
              <NominationForm user_id={this.props.user_id} />    
          </Tab>  
          <Tab
            style={{backgroundColor:"#00c3ff"}}
            icon={<FontIcon className="material-icons" style={iconStyles}>grade</FontIcon>}
            label="Results!">
          <ResultsBox user_id={this.props.user_id} />
          </Tab>  
        </Tabs>
        <FontIcon className="material-icons" style={iconStyles}></FontIcon>
      </Paper>
    );
  }
}

