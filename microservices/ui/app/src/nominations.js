import axios from 'axios';
import React, { Component } from 'react';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Media from 'react-media';


const stylesOriginal = 
{
  container:{
    backgroundColor: 'rgba(5, 29, 76, 0.86)',
    display: 'flex',
    flexWrap: 'wrap',
    WebkitFlexFlow: 'row wrap',
    justifyContent: 'flex-start'
  },
  Card: 
  {
    backgroundColor: '#e3f2fd',
    marginTop:'10px',
    width:"250px",
    marginLeft: "auto",
    marginRight: 'auto'
  }
}

const stylesResponsive = 
{
  container:{
    backgroundColor: 'rgba(5, 29, 76, 0.86)',
    display: 'flex',
    flexWrap: 'wrap',
    WebkitFlexFlow: 'row wrap',
    justifyContent: 'flex-start'
  },
  Card: 
  {
    backgroundColor: '#e3f2fd',
    marginTop:'10px',
    width:"250px",
    marginLeft: "auto",
    marginRight: 'auto'
  }
}

export default class Nominations extends Component{
  render(){
    return(
      <Media query="(max-width: 1253px)">
        {matches =>
            matches ? (
            <ResponsiveNominations 
              data = {this.props.data}
              user_id = {this.props.data} 
              event_id = {this.props.event_id}
              style={stylesResponsive.container}
              cardStyle={stylesResponsive.Card}
            />
            ) : (
            <ResponsiveNominations 
              data = {this.props.data}
              user_id = {this.props.data}
              event_id = {this.props.event_id} 
              style={stylesOriginal.container}
              cardStyle={stylesOriginal.Card}
            />
            )
        }
      </Media>
    );
  }
}

class ResponsiveNominations extends Component {

  constructor(props) {
      super(props);
      this.state = {
        data: props.data.nominationData,
        voteLabel: "Vote",
        voteColor:"red",
        voteBool:false
      };
    }

    handleVote(voteFor) {
      let body = {
        username: voteFor,
        event: this.state.data.eventName,
        user_id: this.props.user_id,
        event_id: this.state.data.event_id
      }
      axios.post(`https://api.${process.env.REACT_APP_CLUSTER_NAME}.hasura-app.io/vote`,body).then((result)=>{
        this.setState({voteLabel:"Done",voteColor:"green",voteBool:true})
      })
    }
    
    handleOverlay = (e)=>{
      let overlay = e.target.nextSibling.style
      overlay.display = overlay.display==="none"?"block":"none"
    }

  render() {
    return (
      <div className="NominationFelxbox" style={this.props.style}>
        {
          this.state.data.nominationData.map((item,index)=>
            <Card style={this.props.cardStyle} key={index}>
              <CardHeader
                title={item.username}
              />
              <object 
                style={{minHeight:"250px", width:"100%", margin:"auto"}} 
                data={item.submission} 
                aria-label=""
                onMouseEnter ={this.handleOverlay}
                onMouseLeave ={this.handleOverlay} />
              <div className="overlay">
                <h3 style={{color:"white"}}>{item.filename}</h3>
                <h4 style={{color:"white"}}>{item.description}</h4>
              </div>
              <CardActions style={{marginLeft:"auto", paddingTop:"25px" ,marginRight:"auto",width:"50px"}} >
                <FlatButton
                  icon={
                    <i className="material-icons" 
                      style={{marginLeft:"-5px",color:this.state.voteColor}}>
                      fingerprint
                    </i>
                  }
                  label={this.state.voteLabel} 
                  onClick = {()=>this.handleVote(item.username)}
                  disabled = {this.state.voteBool} />
              </CardActions>
            </Card>
          )
        }
      </div>
    )
  }
};
