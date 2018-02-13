import React from 'react';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Lock from 'material-ui/svg-icons/action/lock';
import LockOpen from 'material-ui/svg-icons/action/lock-open';


export default class AuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: false,
            display:"block",
            message:"",
            open:false
        };
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    forgot_password = (e) => {
        e.preventDefault();
        let clusterName = process.env.REACT_APP_CLUSTER_NAME
        let url = `https://auth.${clusterName}.hasura-app.io/v1/providers/email/forgot-password`
        if (this.refs.emailBox.input.value === "") {
            this.setState({message:"Please type your email before clicking this.", open:true})
        }
        else {
            let body = {
                "email":this.refs.emailBox.input.value
            }
            axios.post(url, body).then((result)=>{
                if(result.status === 200){
                    this.setState({message:"Sent a reset link. Check your mail now.", open:true})    
                }
            }).catch((error)=>{
                this.setState({message:error.response.data.message, open:true})
            })
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        let authLock = this.refs.authLock.state.switched
        let email = this.refs.emailBox.input.value
        let password = this.refs.passwordBox.input.value
        let body= {
            "provider": "email",
            "data": {
                "email": email,
                "password": password
            }
        }
        axios.post(`https://auth.${process.env.REACT_APP_CLUSTER_NAME}.hasura-app.io/v1/login`,body).then((result)=>{
            if(result.status === 200){
                this.props.handler(result.data.hasura_id)
                this.setState({
                    logged_in:true,
                    display:"none"
                })
            }
        }).catch((error)=>{
            this.setState({message:error.response.data.message, open:true})
        })
    }

    render() {
        return (
            <Paper style={{width:"25%",margin:"auto",display:this.state.display}} zDepth={3} className="LoginFormWrapper">    
            <Paper 
                style={{backgroundColor:"rgb(88, 160, 255)", height:"50px", paddingTop:"15px"}}
                zDepth={3}
            >
                <span style={{fontFamily:"sans-sarif",fontSize:"24px",fontWeight:"bolder"}}>Please Login.</span>
            </Paper>
            <form 
                className="LoginFormy" 
                id="LoginFormy" 
                onSubmit={this.handleSubmit} 
                style={{
                    display:this.state.form_disp,
                    height:"350px"
                }}
            >
                <TextField
                    ref="emailBox"
                    floatingLabelText="Email"
                    type="email"
                    style={{width:"90%"}}
                    required
                /><br />
                <TextField
                    ref="passwordBox"
                    floatingLabelText="Password"
                    type="password"
                    autoComplete="off"
                    style={{width:"90%"}}
                    required
                /><br />
                <Checkbox
                    ref="authLock"
                    style = {{marginLeft:"10px", marginTop:'45px'}}
                    checkedIcon={<Lock style={{marginLeft:"-10px"}} />}
                    uncheckedIcon={<LockOpen style={{marginLeft:"-10px"}} />}
                    label="Keep me locked in."
                    labelStyle={{marginLeft:"-50px"}}
                />
                <span style={{fontSize:"10px", marginLeft:"-50px"}}>
                    (Excuse the cheesy pun. 
                    <span role="img" aria-label="">😅</span>)
                </span>
                <span style={{display:"block", marginTop:"45px", marginLeft:"-70px"}}>
                    <span 
                        role="img" 
                        aria-label="" 
                        style={{marginRight:"25px", fontSize:"36px"}}
                    >
                        😱
                    </span>
                    <a href="" target="_blank" onClick={this.forgot_password}>
                        Oops I forgot my password!
                    </a>
                </span>
                <button>Login</button>
            </form>
            <Snackbar
                open={this.state.open}
                message={this.state.message}
                autoHideDuration={5000}
                onRequestClose={this.handleRequestClose}
            />    
            </Paper>
        );
    }
}