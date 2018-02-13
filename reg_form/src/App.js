import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import './App.css';
import Registration from './Registration';


const style = {
  height: 700,
  width: 600,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor:"#D6DBDF  "
};

const bannerStyle = {
  backgroundColor:"#D6EAF8",
  height:100,
  paddingTop:"16px",
  width:"99%",
  margin:"auto",
  marginTop:"10px",
  marginBottom:"10px",
  textAlign: "center",
  color: "#17202A"
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>

            <Paper zDepth={4} style = {bannerStyle}><b><h1>Welcome to Electon!</h1></b></Paper>




          <Paper style={style} zDepth={2}>
            <Registration />
          </Paper>
         </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
