import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


const Cardstyle = 
  {
    backgroundColor: '#e3f2fd',
    marginTop:'10px',
    width:'400px'
  }

const bannerStyleResults = {
  backgroundColor:"#80CBC4",
  height:"50px",
  paddingTop:"16px",
  width:"99%",
  margin:"auto",
  marginTop:"10px",
  textAlign: "center"
}

const resultsWrapper = {
    backgroundColor:"rgba(5, 29, 76, 0.86)",
    paddingTop:"16px",
    width:"99%",
    margin:"auto",
    paddingBottom: "25px"
}

const bannerStyleLost = {
  backgroundColor:"#EF9A9A",
  height:"50px",
  paddingTop:"16px",
  width:"99%",
  margin:"auto",
  marginTop:"10px",
  textAlign: "center"
}

const bannerStyleWon = {
  backgroundColor:"#A5D6A7",
  height:"50px",
  paddingTop:"16px",
  width:"99%",
  margin:"auto",
  marginTop:"10px",
  textAlign: "center"
}

const resultsData = [
    {
       "Username": "Hyper",
       "Filename": "Dope Ironman",
       "Description": "This is the dopest ironman pic. So it should win.",
       "Submission": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Iron_Man_bleeding_edge.jpg/220px-Iron_Man_bleeding_edge.jpg",
       "Votes": 123
    },
    {
       "Username": "gYpfSMWpXFf",
       "Filename": "KmgnPmWM",
       "Description": "ycxbzbIFbRGsymaB",
       "Submission": "https://vignette.wikia.nocookie.net/ironman/images/2/21/47.jpg",
       "Votes": 100
    }
]

export default class ResultsBox extends Component {
  constructor(){
      super();
      let messArr = ["Oops! You lost this election.","Congratulations! You won this election!"]
      let styleArr = [bannerStyleLost,bannerStyleWon]
      let tempObj = resultsData[1]
      tempObj["Username"] = "You"
      this.state = {
          winner: resultsData[0],
          youDisp: "block",
          you: tempObj,
          message: "",
          bannerStyle:{}
      }
      if (this.state.winner.Username <= this.state.you.Username)
      {
        this.state["message"] = messArr[1]
        this.state["winner"] = this.state["you"]
        this.state["youDisp"] = "none"
        this.state["bannerStyle"] = styleArr[1]
      }
      else {
        this.state["message"] = this.state.winner.Votes > this.state.you.Votes ? messArr[0] : messArr[1]
        this.state["bannerStyle"] = this.state.winner.Votes > this.state.you.Votes ? styleArr[0] : styleArr[1]
      }
  }
  render() {
    return (
      <Paper zDepth={3} style = {resultsWrapper} className="resultsWrapper" >
        <Paper zDepth={4} style = {bannerStyleResults} ><b>Results</b></Paper>
        <div className="CardWrapper" style={{width:'400px',margin:"auto"}}>
            <Card style={Cardstyle}>
            <CardHeader
                title={this.state.winner.Username}
            />
            <CardMedia overlay={<CardTitle title={this.state.winner.Filename} subtitle={this.state.winner.Description} />}>    
                <object style={{height:"250px"}} data={this.state.winner.Submission} aria-label=""/>
            </CardMedia>
            <CardText>
                Votes: {this.state.winner.Votes}
            </CardText>
            </Card>
            <div className="ConditionalWrap" style={{display:this.state.youDisp,marginTop:"-20px",marginLeft:"15px"}}>
            <span style={{backgroundColor: "rgb(227, 242, 253)", fontFamily: "Roboto, sans-serif", width: "250px"}}>
                Your votes: {this.state.you.Votes}
            </span>
            </div>
        </div>
        <Paper zDepth={2} style = {this.state.bannerStyle} ><b>{this.state.message}</b></Paper>  
      </Paper>
    );
  }
}
