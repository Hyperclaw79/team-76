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
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Admin_Panel_filetypeform from './Admin_Panel_filetypeform';

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
  radioButton: {
    marginBottom: 16,
    color: "#17202A"
  }
};



class Admin_Panel extends React.Component {

  state = {
    stepIndex: 0,
  };

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

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
                <div>
                  Your admin name. <br />

                  <TextField
                    floatingLabelText="Your Admin Name"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  />
                </div>
              );
              case 1:
                return (
                        <div>
                        Your admin email id. <br/>
                        We need this to keep track of who creates the events! <br/>
                          <TextField
                            floatingLabelText="You admin Email id"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                          />
                       </div>
                      );
      case 2:
        return (
                <div>
                  Name of the election you'd like to start: <br />
                  <TextField
                    floatingLabelText="Name of the election"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  />
               </div>
              );
      case 3:
          return (
                  <div>
                    Please specify the type of file user can upload: <br /><br/><br />
                    <Paper zDepth={1} style = {{
                    height: 200,
                    width: 300,
                    margin: 20,
                    backgroundColor:"#C5CAE9",
                    textAlign: 'center',
                    display: 'inline-block'}}>
                    <br/>
                    <Admin_Panel_filetypeform />
                  </Paper>
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
        <Paper zDepth={0} style = {bannerStyle}><b><h2>Admin Panel</h2></b></Paper>
        <Stepper linear={false} activeStep={stepIndex}>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 0})}>
              Your Name
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 1})}>
              Your Email
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 2})}>
              Name of Event
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 3})}>
              Type of File
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
              disabled={stepIndex === 3}
              primary={true}
              onClick={this.handleNext}
            />
            <br/><br/>
            <FlatButton
              label="Submit"
              backgroundColor="#95A5A6"
              hoverColor="#7FB3D5"
              disabled={stepIndex < 3}

              style={{marginRight: 12}}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Admin_Panel;
