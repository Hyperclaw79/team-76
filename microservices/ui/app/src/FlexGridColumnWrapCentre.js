import React, { Component } from 'react';
import './App.css';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';



const Cardstyle ={
                    width: '95%',
                    backgroundColor: '#e3f2fd'
 }

const styles = {
  div:{
    display: 'flex',
    flexFlow: 'column wrap',
    padding: 10,
    width: '100%'
  }

};

class FlexGridColumnWrapRight extends Component {

  constructor(props) {
      super(props);
      this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});


  render() {
    return (

        <div style={styles.div}>
            <Card style={Cardstyle}>
              <CardHeader
                title="SELFIE COMPETITION!"
              />
              <CardText>
              Whose face will win!?
                <h4>#faces #selfie</h4>
                <Divider />
              </CardText>
              <CardTitle subtitle="~Dec 9, 2017" />
              <CardActions>
                
                <RaisedButton
                   icon={<FontIcon className="material-icons">done_all</FontIcon>}
                   label="See the Nominees!"
                   onClick={this.handleToggle}
                />
                <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                      >
                      <MenuItem onClick={this.handleClose}>
                        <Card style={Cardstyle}>
                          <CardHeader
                            title="Google"
                            subtitle="@google"
                          />
                          <CardMedia>
                             <img src="https://cloud.google.com/images/why-google/buildingblock.png" alt="" width='50' height='300' />
                          </CardMedia>
                          <CardActions>
                            <FlatButton  icon={<i className="material-icons">fingerprint</i>} label="Vote"/>
                          </CardActions>
                        </Card>
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <Card style={Cardstyle}>
                          <CardHeader
                            title="Troye Sivan"
                            subtitle="@troyesivan"
                          />
                          <CardMedia>
                            <img src="https://is5-ssl.mzstatic.com/image/thumb/Music6/v4/7d/e9/e5/7de9e568-a8e5-9f86-d65a-49c1f305f2ac/UMG_cvrart_00602547600639_01_RGB72_1800x1800_15UMGIM55648.jpg/1200x630bb.jpg" alt="" height='500' width='50' />
                          </CardMedia>
                          <CardActions>
                            <FlatButton  icon={<i className="material-icons">fingerprint</i>} label="Vote"/>
                          </CardActions>
                        </Card>
                      </MenuItem>
                      <MenuItem>
                        <Card style={Cardstyle}>
                          <CardHeader
                            title="Hasura Education"
                            subtitle="@HasuraEd"
                          />
                          <CardMedia>
                             <img src="https://pbs.twimg.com/media/DI84C6ZV4AAwOUf.png:large" alt="" width='50' height='300' />
                          </CardMedia>
                          <CardActions>
                            <FlatButton  icon={<i className="material-icons">fingerprint</i>} label="Vote"/>
                          </CardActions>
                        </Card>
                      </MenuItem>
                </Drawer>
                  </CardActions>
                </Card>



      </div>
    )
  }
};

export default FlexGridColumnWrapRight;
