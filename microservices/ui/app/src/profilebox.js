import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

const Cardstyle ={ backgroundColor: '#00695C',

 }

const iconStyles = {
  marginRight: 5,
  padding: 10
};



export default class ProfileBox extends Component {
  constructor(){
    super();
    this.state = {
      userData: {
        Name: "Tony Stark",
        Score: "7",
        Latest: "Robot Hacking"
      }
    }
  }
  render() {
    return (
      <div className="RightSideHeader">


              <Card style={Cardstyle}>

                <CardHeader
                  title={<h2>{this.state.userData.Name}</h2>}
                  subtitle={<h3>User Statistics</h3>}
                />
                <CardMedia>
                  <i class="material-icons">account_circle</i>
                </CardMedia>
                <CardActions>
                  <Divider />
                <FlatButton
                  label={"Totally won "+this.state.userData.Score+"events"}
                  backgroundColor="#69F0AE"
                  hoverColor="#FFFFFF"
                />
              <FlatButton
                style={{display:"block"}}
                label={"Last Participated in: "+this.state.userData.Latest}
                backgroundColor="#69F0AE"
                hoverColor="#FFFFFF"
              />
                </CardActions>
              </Card>


   </div>
    );
  }
}
