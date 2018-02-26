import React from 'react';
import Paper from 'material-ui/Paper';
import Media from "react-media";
import Registration from './registration';
import LoginForm from './login';
import Toggle from 'material-ui/Toggle';

export default class AuthForm extends React.Component{
    render() {
        return(
            <Media query="(max-width: 1199px)">
                {matches =>
                    matches ? (
                    <ResponsiveAuthForm 
                        handler={this.props.handler} 
                        width="95vw" 
                        emojiFix="-50px" 
                        heightFix="70px" 
                    />
                    ) : (
                    <ResponsiveAuthForm 
                        handler={this.props.handler} 
                        width="25%" 
                        emojiFix="-70px"
                        heightFix= "100px"
                    />
                    )
                }
            </Media>
        );
    }
}

class ResponsiveAuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_in: false,
            display:"block",
            title:"Please Login.",
            login_disp:"block",
            reg_disp:"none",
        };
    }

    handle_Disp = (disp, log)=>{
        this.setState({logged_in:log,display:disp})
    }

    handleToggle = (e)=>{
        if (this.refs.toggler.state.switched) {
            this.setState({reg_disp:"block",login_disp:"none",title:"Please Register."})
        }
        else {
            this.setState({reg_disp:"none",login_disp:"block",title:"Please Login."})
        }
    }

    finalToggle = (status)=>{
        if(status) {
            this.setState({
                reg_disp:"none",
                login_disp:"block",
                title:"Please Login."
            });
        }
    }


    render() {
        return (
            <Paper 
                style={{
                    width:this.props.width,
                    margin:"auto",
                    marginTop:this.props.heightFix,
                    display:this.state.display
                }} 
                zDepth={3} 
                className="AuthFormWrapper"
            >
            <Paper zDepth={3} style={{backgroundColor:"#3103f4"}}>
                <Toggle
                    ref="toggler"
                    label="Have an account?(N/Y)"
                    defaultToggled={true}
                    thumbStyle={{backgroundColor: '#ffcccc'}}
                    trackStyle={{backgroundColor: '#ff9d9d'}}
                    labelStyle={{marginRight:"-25px"}}
                    onToggle={this.handleToggle}
                />
            </Paper>    
            <Paper 
                style={{backgroundColor:"rgb(88, 160, 255)", height:"50px", paddingTop:"15px"}}
                zDepth={3}
            >
                <span style={{fontFamily:"sans-sarif",fontSize:"24px",fontWeight:"bolder"}}>{this.state.title}</span>
            </Paper>
            <LoginForm 
                display={this.state.login_disp}
                handler={this.props.handler}
                subhandler={this.handle_Disp}
                emojiFix={this.props.emojiFix}
            />
            <Registration callback={this.finalToggle} display={this.state.reg_disp} />    
            </Paper>
        );
    }
}