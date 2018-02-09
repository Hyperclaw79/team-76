import React, { Component } from 'react';
import ElectonBox from './electonbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper'

const Styleapp = {
  width: '100%',
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
  render() {
    return (
      <MuiThemeProvider>
      <div style={Styleapp} className="App">
          <Paper zDepth={4} style = {bannerStyle} ><b>Electon</b></Paper>
          <ElectonBox />
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
