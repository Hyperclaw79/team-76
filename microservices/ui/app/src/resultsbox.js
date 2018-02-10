import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import axios from 'axios';


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
    paddingTop:"16px",
    width:"99%",
    margin:"auto",
    paddingBottom: "25px"
}

const bannerStyleLost = {
  backgroundColor:"#EF9A9A",
  height:"50px",
  paddingTop:"16px",
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
    "Event": "Ironman pics", 
    "Details": 
    {
      "Winner":
      {
        "Username": "Hyper",
        "Filename": "Dope Ironman",
        "Description": "This is the dopest ironman pic. So it should win.",
        "Submission": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Iron_Man_bleeding_edge.jpg/220px-Iron_Man_bleeding_edge.jpg",
        "Votes": 123
      },
      "User":
      {
        "Username": "Mr. X",
        "Filename": "Some lame pic",
        "Description": "Read the filename",
        "Submission": "https://vignette.wikia.nocookie.net/ironman/images/2/21/47.jpg",
        "Votes": 100
      }
    }
  },
  { 
    "Event": "Another Finished Event", 
    "Details": 
    {
      "User":
      {
        "Username": "Mr. X",
        "Filename": "ShowBot Demo",
        "Description": "The video showing ShowBot in action.",
        "Submission": "https://www.youtube.com/embed/rMxjhtTXLRo",
        "Votes": 100
      },
      "Winner":
      {
        "Username": "Mr. Y",
        "Filename": "Meh",
        "Description": "Read the filename again.",
        "Submission": "https://www.youtube.com/embed/VIaeDoh2vvc",
        "Votes": 100
      }
    }
  }  
]

class ResBox extends Component {
  handleOverlay = (e)=>{
    let overlay = e.target.nextSibling.style
    overlay.display = overlay.display==="none"?"block":"none"
  }
  render(){
    return(
      <div className="ResBoxWrapper">
        <div className="CardWrapper" style={{width:'400px',margin:"auto"}}>
            <Card style={Cardstyle}>
            <CardHeader
                title={this.props.data.Winner.Username}
            />
            <object 
              style={{minHeight:"350px", width:"100%", margin:"auto"}} 
              data={this.props.data.Winner.Submission} 
              aria-label=""
              onMouseEnter ={this.handleOverlay}
              onMouseLeave ={this.handleOverlay}/>
            <div className="overlay">
              <h3 style={{color:"rgba(255,255,255,0.65)"}}>{this.props.data.Winner.Filename}</h3>
              <h4 style={{color:"rgba(255,255,255,0.65)"}}>{this.props.data.Winner.Description}</h4>
            </div>
            <CardText style={{paddingTop:"25px"}}>
                Votes: {this.props.data.Winner.Votes}
            </CardText>
            </Card>
            <div className="ConditionalWrap" 
              style={
                {
                  display:this.props.data.youDisp,
                  marginTop:"-20px",marginLeft:"15px"
                }
              }
            >
            <span 
              style={
                {
                  backgroundColor: "rgb(227, 242, 253)", 
                  fontFamily: "Roboto, sans-serif", 
                  width: "250px"
                }
              }
            >
                Your votes: {this.props.data.User.Votes}
            </span>
            </div>
        </div>
        <Paper zDepth={2} style = {this.props.data.bannerStyle} ><b>{this.props.data.message}</b></Paper>
      </div>
    )
  }
}

class Cards extends Component {
  render(){
    return(
      <Card style={
        {
          width:"99%", 
          margin:"auto", 
          marginTop: "10px",
          backgroundColor:"rgba(5, 29, 76, 0.86)"
        }
      }>
        <CardHeader
          style={{backgroundColor:"white",textAlign:"center"}}
          title={this.props.title}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardMedia expandable={true}>
          <ResBox data={this.props.data}/>
        </CardMedia>
      </Card>
    );
  }
}



export default class ResultsBox extends Component {
  constructor(){
      super();
      this.state = {
        results:resultsData.map((res)=>this.generator(res))
      }
  }
  componentDidMount(){
    axios.get(`http://api.${process.env.CLUSTER_NAME}.hasura-app.io/results`).then((result)=>{
      this.setState({results:result.data.map((res)=>this.generator(res))})
    })
  }
  generator = (eventObj) => {
    let messArr = ["Oops! You lost this election.","Congratulations! You won this election!"]
    let styleArr = [bannerStyleLost,bannerStyleWon]
    let handler = eventObj["Details"]
    handler["User"]["Username"] = "You"
    if (eventObj.Details.Winner.Votes <= eventObj.Details.User.Votes)
    {
      handler["message"] = messArr[1]
      handler["Winner"] = handler["User"]
      handler["youDisp"] = "none"
      handler["bannerStyle"] = styleArr[1]
    }
    else {
      handler["message"] = messArr[0]
      handler["bannerStyle"] = styleArr[0]
    }
    let product = {
      title:eventObj["Event"],
      data:handler
    }
    return product
  }
  render() {
    return (
      <div style = {resultsWrapper} className="resultsWrapper" >
        <Paper zDepth={4} style = {bannerStyleResults} ><b>Results</b></Paper>
        {
          this.state.results.map((item, index)=>
            <Cards key={index} title={item.title} data={item.data}/>
          )
        } 
      </div>
    );
  }
}
