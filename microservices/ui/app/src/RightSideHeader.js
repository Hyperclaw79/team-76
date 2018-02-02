import React, { Component } from 'react';
import './App.css';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

const Cardstyle ={ backgroundColor: '#d1c4e9',
                    width: '90%'
 }

const iconStyles = {
  marginRight: 5,
  padding: 10
};

const Raisedbuttonstyle = {
  margin:10,
    padding: 10,
  backgroundColor: 'green100'
}

class RightSideHeader extends Component {
  render() {
    return (
      <div className="RightSideHeader">
      

              <Card style={Cardstyle}>
                <CardHeader
                  title="sneh"
                  subtitle="@sneha_sns"
                  avatar={<i class="material-icons">account_circle</i>}
                />
                <CardActions>
                  <Divider />
                  <FlatButton
                    label="Tweets 0"
                  backgroundColor="#F6DDCC"
                  hoverColor="#EDBB99"
                />
                <FlatButton
                  label="Followers 5"
                backgroundColor="#F6DDCC"
                hoverColor="#EDBB99"
              />
              <FlatButton
                label="Following 10"
              backgroundColor="#F6DDCC"
              hoverColor="#EDBB99"
            />
                </CardActions>
              </Card>


   </div>
    );
  }
}

export default RightSideHeader;
