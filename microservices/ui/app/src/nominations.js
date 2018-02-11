import axios from 'axios';
import React, { Component } from 'react';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Cardstyle = 
  {
    backgroundColor: '#e3f2fd',
    marginLeft:"50px",
    marginTop:'10px',
    width:'250px',
  }

const styles = 
  {
    div:{
      backgroundColor: 'rgba(5, 29, 76, 0.86)',
      display: 'inline-flex',
      flexWrap: 'wrap',
      paddingLeft: '100px'
    }
  }

export default class Nominations extends Component {

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
        event: this.state.data.eventName
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
      <div className="NominationFelxbox" style={styles.div}>
        {
          this.state.data.nominationData.map((item,index)=>
            <Card style={Cardstyle} key={index}>
              <CardHeader
                title={item.username}
              />
              <object 
                style={{minHeight:"350px", width:"100%", margin:"auto"}} 
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
