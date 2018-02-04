import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const Cardstyle = 
  {
    backgroundColor: '#e3f2fd',
    marginLeft:"50px",
    marginTop:'10px',
    width:'250px'
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
      this.state = {data: props.data,voteLabel: "Vote",voteColor:"red",voteBool:false};
    }

    handleVote = () => {
      this.setState({voteLabel:"Done",voteColor:"green",voteBool:true})
      let newData = this.state.data
      let newCount = parseInt(newData.count,10) + 1
      newData["count"]=newCount
    }  

  render() {
    return (
      <div className="NominationFelxbox" style={styles.div}>
        {
          this.state.data.map((item,index)=>
            <Card style={Cardstyle} key={index}>
              <CardHeader
                title={item.Username}
              />
              <CardMedia overlay={<CardTitle title={item.Filename} subtitle={item.Description} />}>    
                <object style={{height:"250px"}} data={item.Submission} aria-label=""/>
              </CardMedia>
              <CardActions style={{marginLeft:"auto",marginRight:"auto",width:"50px"}} >
                <FlatButton
                  icon={
                    <i className="material-icons" 
                      style={{marginLeft:"-5px",color:this.state.voteColor}}>
                      fingerprint
                    </i>
                  } 
                  label={this.state.voteLabel} 
                  onClick = {this.handleVote}
                  disabled = {this.state.voteBool} />
              </CardActions>
            </Card>
          )
        }
      </div>
    )
  }
};
