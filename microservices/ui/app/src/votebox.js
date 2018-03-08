import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';
import Nominations from './nominations';
import axios from 'axios';

const styles = {
  div:{
    padding: '10px',
  }
};



class Cards extends Component {
  render(){
    return(
      <Card>
        <CardHeader
          title={this.props.title}
          subtitle={
            <div>
              <span>{this.props.subtitle}</span>
              <span style={{display:"block"}}>{this.props.tags}</span>
              <span style={{display:"block"}}>{this.props.deadline}</span>
            </div>
          }
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardMedia expandable={true}>
          <Nominations 
            data={{
              "nominationData":this.props.nominationData,
              "eventName":this.props.title,
              "event_id":this.props.event_id
            }}
            user_id={this.props.user_id}
          />
        </CardMedia>
      </Card>
    );
  }
}


export default class VoteBox extends Component {
  constructor(){
    super();
    this.state = {
      eventList:[{
        "deadline": "",
        "nominationData": [
            {
                "description": "",
                "filename": "",
                "submission": "",
                "username": ""
            }
        ],
        "phase": "running",
        "subtitle": "",
        "tags": "",
        "title": "",
        "event_id":""
      }]
    }  
  }
  componentDidMount(){
    axios.get(`https://api.${process.env.REACT_APP_CLUSTER_NAME}.hasura-app.io/events/running`)
      .then((result)=>{
        this.setState({eventList:result.data.data})
    }).catch((error)=>{
        alert(error.response.data.description);
    })
  }
  render() {
    return (
      <div>
        <div style={styles.div}>
          <span><b style={{marginLeft:"40%"}}>List of running events</b></span>
          <hr />
          <Paper zDepth={3}>
          {
            this.state.eventList.map((item,index)=>
              <div key={"EventWrapper-"+index}>
                <Cards 
                  title={item.title}
                  event_id={item.event_id} 
                  subtitle={item.subtitle} 
                  tags={item.tags} 
                  deadline={item.deadline} 
                  nominationData={{"nominationData":item.nominationData,"eventName":item.title}}
                  user_id={this.props.user_id}
                />
              </div>
            )
          }
          </Paper>
        </div>
      </div>
    )
  }
};

