import React, { Component } from 'react';
import EventBox from './eventbox';
import ProfileBox from './profilebox';
import Drawer from 'material-ui/Drawer';
import Media from 'react-media';

class ElectonBox extends Component {
  constructor(){
    super();
    this.state={open:false}
  }
  handleToggle = () => this.setState({open: !this.state.open});
  render() {
    return (
      <div style={{display:this.props.disp, flexWrap:"wrap", paddingLeft:"25px"}}>
        <EventBox user_id={this.props.user_id} />
        <Media query="(max-width: 1253px)" user_id={this.props.user_id}>
          { matches =>
            matches ? 
            (
              <Drawer 
                user_id={this.props.user_id}
                width={365} 
                openSecondary={true} 
                open={this.state.open}
                docked={false}
                zDepth={4}
                onRequestChange={this.handleToggle}
                containerStyle={{
                  height:"auto", 
                  backgroundColor:"rgba(0,0,0,0)",
                  marginTop:"100px"
                }}
              >
                <ProfileBox user_id={this.props.user_id} /> 
              </Drawer>   
            ):(
            <ProfileBox user_id={this.props.user_id} />
            )
          }
        </Media>
      </div>
    );
  }
}

export default ElectonBox;
