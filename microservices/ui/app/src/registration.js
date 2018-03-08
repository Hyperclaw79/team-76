import React from 'react';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Droppy from './droppy';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';

export default class Registration extends React.Component {

  constructor(){
    super();
    this.state = {
      stepIndex: 0,
      submitDisabled:true,
      email: '',
      username: '',
      password: '',
      avatar: '',
      message:"",
      open:false
    };
  }
  
  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 3) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleChange = (event)=>{
    let param = event.target.dataset.field
    this.setState({[param]:this.refs[[param]].input.value})
  }

  handleSubmit = (event)=>{
    let avatar = this.state.avatar;
    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    let params = [avatar, username, email, password]
    function check(param)
    {
      return !(param === '' || param === null);
    }
    if(params.every(check)) {
      let body = {
        "username": username,
        "email": email,
        "password": password,
        "avatar": avatar    
      }
      axios.post(`https://api.${process.env.REACT_APP_CLUSTER_NAME}.hasura-app.io/register`,
            body,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        ).then((result)=>{
            if(result.body.status === 'success' ){
                this.props.callback();
            }
        }).catch((error)=>{
            this.setState({open:true, message:error.response.data.description})
        })
   }
  }

  filestore = (file)=>{
    let clusterName = process.env.REACT_APP_CLUSTER_NAME
    let avatar = new FormData();
    avatar.append("avatar", file);
    axios.post(
      `https://api.${clusterName}.hasura-app.io/fileUpload`,
      avatar,
      {
          headers: {
              "Content-Type": "multipart/form-data"
          },
          withCredentials: true
      }
    ).then((result)=>
    {
        let filelink = result.data.data.file_link
        this.setState({avatar:filelink}, ()=>console.log("Avatar Uploaded Successfully."))
    }).catch((error)=>{
        this.setState({open:true, message:error.response.data.description});
    })
  }

  handleUpload = (file)=>{
    this.setState({submitDisabled:false},this.filestore(file))
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
                <div>
                  <span>
                    Make sure that the email id is valid. A verification message will be sent to this id.
                  </span>
                  <br />
                  <TextField
                    type="email"
                    data-field="email"
                    ref="email"
                    floatingLabelText="Email"
                    autoComplete="email"
                    hintText="Enter a valid email id."
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                );
      case 1:
        return (
                <form>
                  <TextField
                    data-field="username"
                    ref="username"
                    floatingLabelText="Username"
                    autoComplete="username"
                    hintText="Choose a unique username, people will know you by this!"
                    floatingLabelStyle={{marginTop:"-18px"}}
                    floatingLabelFocusStyle={{marginTop:"-18px"}}
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  <TextField
                    floatingLabelText="Password"
                    data-field="password"
                    ref="password"
                    type="password"
                    autoComplete="new-password"
                    hintText="Use a difficult password. Nobody should be able to guess this!"
                    floatingLabelStyle={{marginTop:"-18px"}}
                    floatingLabelFocusStyle={{marginTop:"-18px"}}
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </form>
              );
      case 2:
          return (
                  <div>
                    <span>
                      Drag and Drop an image below to use it as your display picture.
                      <br />
                      <br />
                    </span>
                    <Droppy ref="droppy" callback={this.handleUpload} skipFS />
                  </div>
                );
      default:
        return;
    }
  }

  handleRequestClose = () => {
    this.setState({
        open: false,
    });
};

  render() {
    const {stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (

      <div style={{display:this.props.display, width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper linear={false} activeStep={stepIndex}>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 0})}>
              Email
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 1})}>
              Username
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 2})}>
              Avatar
            </StepButton>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          <div>{this.getStepContent(stepIndex)}</div>
          <div style={{marginTop: 12}}>
            <FlatButton
              label="Back"
              backgroundColor="#AED6F1"
              hoverColor="#99A3A4"
              disabled={stepIndex === 0}
              onClick={this.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label="Next"
              disabled={stepIndex === 2}
              primary={true}
              onClick={this.handleNext}
            />
            <br/><br/>
          </div>
        </div>
        <button
          className="RegisterSubmit"
          style={{backgroundColor:"#03A9F4"}}
          disabled={this.state.submitDisabled}
          onClick={this.handleSubmit}
        >
          Register
        </button>
        <Snackbar
            open={this.state.open}
            message={this.state.message}
            autoHideDuration={5000}
            onRequestClose={this.handleRequestClose}
        />
      </div>  
    );
  }
}
