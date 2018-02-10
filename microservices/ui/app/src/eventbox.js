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

let data = [
  {
    title:"Selfie Contest",
    subtitle:"Who's the best looking?",
    tags:"#faces #selfies",
    deadline: '5days',
    phase: 'running',
    nominationData: [
      {
         "Username": "ymmIADMSK",
         "Filename": "QLhosFCXRngD",
         "Description": "LuqGEzcASVDVcFIAGPWM",
         "Submission": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Iron_Man_bleeding_edge.jpg/220px-Iron_Man_bleeding_edge.jpg"
      },
      {
         "Username": "gYpfSMWpXFf",
         "Filename": "KmgnPmWM",
         "Description": "ycxbzbIFbRGsymaB",
         "Submission": "https://vignette.wikia.nocookie.net/ironman/images/2/21/47.jpg"
      },
      {
         "Username": "DQuClE",
         "Filename": "SHBIgOwkvMfV",
         "Description": "hBZuPcmsJUDOrXzTPowLY",
         "Submission": "https://www.sideshowtoy.com/assets/products/400310-iron-man-mark-iii/lg/marvel-iron-man-mark-3-life-size-figure-400310-08.jpg"
      },
      {
         "Username": "DZTFNUgiCb",
         "Filename": "pAHlFdbb",
         "Description": "MmGdoODojEVkypGLxmbwBo",
         "Submission": "https://images-na.ssl-images-amazon.com/images/I/91qvAndeVYL._RI_.jpg"
      },
      {
         "Username": "FHCegEPGd",
         "Filename": "AeBNKdu",
         "Description": "FcuntDPGFeKOtDWUVW",
         "Submission": "https://vignette.wikia.nocookie.net/marveldatabase/images/0/06/Iron_Man_Armor_Model_37.jpg"
      }
   ]
  },
  {
    title:"Audiophilia",
    subtitle:"Anyone's gonna rule the music league here?",
    tags:"#recordings #songs",
    deadline: '4days',
    phase: 'open'
  },
  {
    title:"Meme Wars",
    subtitle:"May the best meme win!",
    tags:"#memes",
    deadline: '7days',
    phase: 'open'
  },
  {
    title:"Art Battle",
    subtitle:"Brush up for the battle of brushes and pencils.",
    tags:"#drawing #sketches #painting #art",
    deadline: '2days',
    phase: 'running',
    nominationData: [
      {
         "Username": "rpgBoz",
         "Filename": "SehmQojmH",
         "Description": "rlGcJHBCIQcnfrfxgQYRbCDp",
         "Submission": "https://vignette.wikia.nocookie.net/ironman/images/2/21/47.jpg"
      },
      {
         "Username": "nWjENGJjSeW",
         "Filename": "WDZofRiM",
         "Description": "HEFqrxVgHQOiCiVYpK",
         "Submission": "https://images-na.ssl-images-amazon.com/images/I/91qvAndeVYL._RI_.jpg"
      },
      {
         "Username": "dExeXxpI",
         "Filename": "srQMe",
         "Description": "YLIbCmiKavpjrEZWPgjr",
         "Submission": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Iron_Man_bleeding_edge.jpg/220px-Iron_Man_bleeding_edge.jpg"
      },
      {
         "Username": "dNVHOSi",
         "Filename": "jnVoIXogS",
         "Description": "CIlvQpEHqbspkskdbmtfmNjr",
         "Submission": "https://vignette.wikia.nocookie.net/marveldatabase/images/0/06/Iron_Man_Armor_Model_37.jpg"
      },
      {
         "Username": "gDwKxr",
         "Filename": "LalhZPuhqp",
         "Description": "lqaSKiqKOAXObklUUXVXrIxfu",
         "Submission": "https://www.sideshowtoy.com/assets/products/400310-iron-man-mark-iii/lg/marvel-iron-man-mark-3-life-size-figure-400310-08.jpg"
      }
   ]
  },
  {
    title:"Pen up!",
    subtitle:"Showcase your best articles/stories here.",
    tags:"#writing #stories #articles",
    deadline: '1day',
    phase: 'running',
    nominationData: [
      {
         "Username": "ETaKKoHZgRm",
         "Filename": "ocPxKNLghGG",
         "Description": "YNsCEyMdXxpKYHfUm",
         "Submission": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Iron_Man_bleeding_edge.jpg/220px-Iron_Man_bleeding_edge.jpg"
      },
      {
         "Username": "lUnCuDu",
         "Filename": "BxfmjM",
         "Description": "FkpZWiaqilDxAExliwPhFXhZ",
         "Submission": "https://vignette.wikia.nocookie.net/ironman/images/2/21/47.jpg"
      },
      {
         "Username": "sKsgGaRZ",
         "Filename": "oOGgiO",
         "Description": "WSMoxyZDJplnbATjrAIQ",
         "Submission": "https://vignette.wikia.nocookie.net/marveldatabase/images/0/06/Iron_Man_Armor_Model_37.jpg"
      },
      {
         "Username": "IVjPSkW",
         "Filename": "UaADrAa",
         "Description": "LHjroakoJDGFGreaPcezG",
         "Submission": "https://images-na.ssl-images-amazon.com/images/I/91qvAndeVYL._RI_.jpg"
      },
      {
         "Username": "hXARt",
         "Filename": "QvfcCUju",
         "Description": "GpYnscvqBhQNDBtWrOYbYCRkm",
         "Submission": "https://www.sideshowtoy.com/assets/products/400310-iron-man-mark-iii/lg/marvel-iron-man-mark-3-life-size-figure-400310-08.jpg"
      }
   ]
  }
]

export default class EventBox extends Component {
  constructor(){
    super();
    this.state = {
      running:data.filter((event)=>{
        return event.phase === 'running';
      }),
      open:data.filter((event)=>{
        return event.phase === 'open';
      })
    }
  }
  componentDidMount(){
    axios.get(`http://api.${process.env.CLUSTER_NAME}.hasura-app.io/events`).then((result)=>{
      this.setState({eventList:result.data})
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
        <Tabs>
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

