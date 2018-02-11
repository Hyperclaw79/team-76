import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import NominationForm from './nomiform';
import VoteBox from './votebox';
import Paper from 'material-ui/Paper'
import ResultsBox from './resultsbox'
import axios from 'axios'

const iconStyles = {
  marginRight: 500,
  padding: 10
};


export default class EventBox extends Component {
  constructor(){
    super();
    this.state = {
      init: "none",
      status:"Please wait while it loads.",
      running:[{
        "deadline": "",
        "nominationData": [
            {
                "Description": "",
                "Filename": "",
                "Submission": "",
                "Username": ""
            }
        ],
        "phase": "running",
        "subtitle": "",
        "tags": "",
        "title": ""
      }],
      open:[{
        "deadline": "",
        "phase": "open",
        "subtitle": "",
        "tags": "",
        "title": ""
      }]
    }
  }
  componentDidMount(){
    axios.get(`https://api.${process.env.REACT_APP_CLUSTER_NAME}.hasura-app.io/events`).then((result)=>{
      const runner = result.data.data.filter((event)=>{
        return event.phase === 'running';
      });
      const opener = result.data.data.filter((event)=>{
        return event.phase === 'open';
      });
      this.setState(
        {
          running:runner,
          open:opener,
          init:"block",
          status:"Loaded!"
        },()=>{
          this.forceUpdate()
          console.log(this.state)
        }
      )
    })
  }
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
        <span>{this.state.status}</span>
        <Tabs style={{display:this.state.init}}>
          <Tab
            style={{backgroundColor:"#00c3ff"}}
            icon={<FontIcon className="material-icons" style={iconStyles}>check_circle</FontIcon>}
            label="Vote!">
             <VoteBox eventsList={this.state.running} />  
          </Tab>  
          <Tab
            style={{backgroundColor:"#00c3ff"}}
            icon={<FontIcon className="material-icons" style={iconStyles}>face</FontIcon>}
            label="Nominate!">
              <NominationForm eventList={this.state.open} />    
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

