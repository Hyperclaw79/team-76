import React, { Component } from 'react';
import ElectonBox from './electonbox';
import AuthForm from './authform';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper'

const Styleapp = {
  width: '100%'
}
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

class App extends Component {
  constructor(){
    super();
    this.state = {core_disp:"none",user:0}
  }
  
  handle_disp=(hasura_id)=>{
    this.setState({core_disp:"flex", user_id:hasura_id})
  }
  
  render() {
    return (
      <MuiThemeProvider>
      <div style={Styleapp} className="App">
          <Paper zDepth={4} style = {bannerStyle} ><b>Electon</b></Paper>
          <AuthForm ref="authForm" handler={this.handle_disp} />
          <ElectonBox disp={this.state.core_disp} user_id={this.state.user_id}/>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
