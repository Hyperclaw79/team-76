import React, { Component } from 'react';
import axios from 'axios';
import {Card, CardMedia, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

export default class ProfileBox extends Component {
  constructor(){
    super();
    this.state = {
      userData: {}
    }
  }
  componentDidMount(){
    let clusterName = process.env.REACT_APP_CLUSTER_NAME
    let url = `https://api.${clusterName}.hasura-app.io/users?user=${this.props.user_id}`
    axios.get(url).then((result)=>{
      this.setState({userData:result.data.data})
    })
  }
  logout = () => {
    let clusterName = process.env.REACT_APP_CLUSTER_NAME
    let url = `https://auth.${clusterName}.hasura-app.io/v1/user/logout`
    axios.get(url).then((result)=>{
      window.location.reload();
    })
  }
  render() {
    return (
      <Paper className="ProfileBoxWrapper" 
        style={{
          backgroundColor:'#262df5',
          width:"360px",
          height:"fit-content",
          display:"flex",
          flexDirection:"column"
        }}
      >
        <Paper style={{backgroundColor:'#00c3ff', height:"72px", paddingTop:"1px"}}>
          <h1 style={{color:"white"}}>Profile</h1>
        </Paper>
        <Card style={{marginTop:"10px"}}>
          <CardMedia style={{width:"350px", margin:"3px"}}>
            <img
              src={this.state.userData.avatar} 
              className="user-avatar" alt="" 
              style={{border:"2px solid black"}}
            />
          </CardMedia>
        </Card>
        <Card style={{marginTop:"10px"}}>
          <CardText style={{padding:"0px", paddingTop:"5px"}}>{<h2>{this.state.userData.name}</h2>}</CardText>
        </Card>
        <Card style={{marginTop:"10px"}}>
          <CardText style={{padding:"0px", paddingTop:"5px"}}>{"Totally won "+this.state.userData.score+" events"}</CardText>
        </Card>
        <Card style={{marginTop:"10px"}}>
          <CardText style={{padding:"0px", paddingTop:"5px"}}>Last Participated in:<b style={{marginLeft:"10px"}}>{this.state.userData.latest}</b></CardText>
        </Card>
        <button 
          className="Logout" 
          style={{
            marginTop:"10px",
            marginBottom:"10px"
          }}
          onClick = {this.logout}
        >
          Logout!
        </button>
      </Paper>
    );
  }
}
