import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import NominationForm from './Nomiform';
import VoteBox from './votebox';
import Paper from 'material-ui/Paper'

const iconStyles = {
  marginRight: 500,
  padding: 10
};


export default class EventBox extends Component {
  constructor(){
    super();
    let data = [
      {
        title:"Selfie Contest",
        subtitle:"Who's the best looking?",
        tags:"#faces #selfies"
      },
      {
        title:"Audiophilia",
        subtitle:"Anyone's gonna rule the music league here?",
        tags:"#recordings #songs"
      },
      {
        title:"Meme Wars",
        subtitle:"May the best meme win!",
        tags:"#memes"
      },
      {
        title:"Art Battle",
        subtitle:"Brush up for the battle of brushes and pencils.",
        tags:"#drawing #sketches #painting #art"
      },
      {
        title:"Pen up!",
        subtitle:"Showcase your best articles/stories here.",
        tags:"#writing #stories #articles"
      }
    ]
    this.state = {
      eventList:data,
      eventNames:data.map((item)=>item["title"])
    }
  }
  render() {
    return (
      <Paper zDepth={3} style={{backgroundColor: '#262df5',width:"65%",marginRight:"70px"}}>
        <Tabs>
          <Tab
            style={{backgroundColor:"#00c3ff"}}
            icon={<FontIcon className="material-icons" style={iconStyles}>check_circle</FontIcon>}
            label="Vote!">
             <VoteBox eventsList={this.state.eventList} />  
          </Tab>  
          <Tab
            style={{backgroundColor:"#00c3ff"}}
            icon={<FontIcon className="material-icons" style={iconStyles}>face</FontIcon>}
            label="Nominate!">
              <NominationForm eventList={this.state.eventNames} />    
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

