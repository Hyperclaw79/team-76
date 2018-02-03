import React, { Component } from 'react';
import './App.css';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';
import FlexGridColumnWrapCentre from './FlexGridColumnWrapCentre';

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
          subtitle={<span><span>{this.props.subtitle}</span><span style={{display:"block"}}>{this.props.tags}</span></span>}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardMedia expandable={true}>
          <FlexGridColumnWrapCentre />
        </CardMedia>
      </Card>
    );
  }
}


class FlexGridRowWrap extends Component {
  constructor(){
    super();
    this.state = {
      eventsList: [
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
                <Cards title={item.title} subtitle={item.subtitle} tags={item.tags} />
              </div>
            )
          }
          </Paper>
        </div>
      </div>
    )
  }
};

export default FlexGridRowWrap;
