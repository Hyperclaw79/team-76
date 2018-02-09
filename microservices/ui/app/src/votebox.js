import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';
import Nominations from './nominations';

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
          <Nominations data={{"nominationData":this.props.nominationData,"eventName":this.props.title}}/>
        </CardMedia>
      </Card>
    );
  }
}


export default class VoteBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      eventsList: props.eventsList
    }
  }
  render() {
    return (
      <div>
        <div style={styles.div}>
          <span><b style={{marginLeft:"40%"}}>List of running events</b></span>
          <hr />
          <Paper zDepth={3}>
          {
            this.state.eventsList.map((item,index)=>
              <div key={"EventWrapper-"+index}>
                <Cards title={item.title} subtitle={item.subtitle} tags={item.tags} deadline={item.deadline} nominationData={{"nominationData":item.nominationData,"eventName":item.title}}/>
              </div>
            )
          }
          </Paper>
        </div>
      </div>
    )
  }
};

