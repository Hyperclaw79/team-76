import React, { Component } from 'react';
import ElectonBox from './electonbox';
import AuthForm from './authform';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper'
import Media from 'react-media';

const bannerStyle = {
  backgroundColor:"white",
  height:"50px",
  paddingTop:"16px",
  width:"99%",
  margin:"auto",
  marginTop:"10px",
  marginBottom:"10px",
  textAlign: "center"
}

const bannerResponsiveStyle = {
  backgroundColor:"white",
  height:"50px",
  paddingTop:"16px",
  width:"97vw",
  margin:"auto",
  marginTop:"10px",
  marginBottom:"10px",
  textAlign: "center"
}

export default class App extends Component {
  constructor(){
    super();
    this.state = {core_disp:"none",user_id:0}
  }
  
  handle_disp=(hasura_id)=>{
    this.setState({core_disp:"flex", user_id:hasura_id})
  }
  
  render() {
    return (
      <MuiThemeProvider>
      <div style={{width:this.props.width}} className="App">
        <Media query="(max-width: 1253px)">
          {matches =>
          matches ? (
          <Paper zDepth={4} style = {bannerStyle} ><b>Electon</b></Paper>
          ):(
          <Paper zDepth={4} style = {bannerResponsiveStyle} ><b>Electon</b></Paper>  
          )}
        </Media>  
        <AuthForm ref="authForm" handler={this.handle_disp} />
        <ElectonBox disp={this.state.core_disp} user_id={this.state.user_id}/>
      </div>
    </MuiThemeProvider>
    );
  }
}

