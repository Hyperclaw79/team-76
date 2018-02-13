import React from 'react';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import Avatar_upload from './Avatar_upload';
import Paper from 'material-ui/Paper';

const bannerStyle = {
  backgroundColor:"#7FB3D5",
  height:70,
  paddingTop:5,
  paddingBottom:5,
  width:"99%",
  margin:"auto",
  marginTop:"10px",
  marginBottom:"10px",
  textAlign: "center",
  color: "#17202A"
}

const styles = {
  floatingLabelStyle: {
    color: "#0B5345",
  },
  floatingLabelFocusStyle: {
    color: "#0B5345",
  },
};

class Registration extends React.Component {

  state = {
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
                <div>
                  Your actual emaild id because we will use this for verification! <br />
                  Make sure you fill this in correctly! <br />
                  <TextField
                    floatingLabelText="Email Id"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  />
                </div>
              );
      case 1:
        return (
                <div>
                  Select a unique username: (make this cool people will know you by this!)
                  <TextField
                    floatingLabelText="Username"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  />
               </div>
              );
      case 2:
          return (
                  <div>
                    This is Electon! You can be anything! <br />
                    <Paper style = {{
                    height: 300,
                    width: 300,
                    margin: 20,
                    textAlign: 'center',
                    display: 'inline-block'}}
                       />
                  </div>
                );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const {stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (

      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Paper zDepth={0} style = {bannerStyle}><b><h2>Registration</h2></b></Paper>
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
          <p>{this.getStepContent(stepIndex)}</p>
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
          </div>
        </div>
        <br /><br />
        <FlatButton
          label="Submit"
          backgroundColor="#95A5A6"
          hoverColor="#7FB3D5"


          style={{marginRight: 12}}
        />
      </div>
    );
  }
}

export default Registration;
