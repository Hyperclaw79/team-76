import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';
import Media from 'react-media';
import Droppy from './droppy';

class DropDown extends Component {

    constructor(props) {
      super(props);
      this.state = {
          open:false,
          eventList: [
            {
              "deadline": "",
              "phase": "open",
              "subtitle": "",
              "tags": "",
              "title": "",
              "event_id": ""
            }
          ],
          choice: 1
        };
    }

    componentDidMount(){
        axios.get(`https://api.${process.env.REACT_APP_CLUSTER_NAME}.hasura-app.io/events/open`).then((result)=>{
          this.setState({eventList:result.data.data})
        })
      }

    handleChange = (event, index, value) => {
        this.setState({
            choice:value,
            open: true
        });
    }    

    handleRequestClose = () => {
        this.setState({
          open: false,
        });
    };

    render() {
      return (
        <div className="DDWrapper">  
            <DropDownMenu 
                value={this.state.choice} 
                onChange={this.handleChange} 
                style={{width:"50%",height:"100%"}} 
                autoWidth={false}
                anchorOrigin={{vertical: 'bottom', horizontal: 'middle'}}>
                {
                    this.state.eventList.map((item,index)=>
                        <MenuItem value={index+1} key={index} primaryText={item.title} />
                    )
                }
            </DropDownMenu>
            <Snackbar
                open={this.state.open}
                message={
                    this.state.eventList[this.state.choice-1].subtitle
                    +"        "+this.state.eventList[this.state.choice-1].tags
                    +"        "+this.state.eventList[this.state.choice-1].deadline
                }
                autoHideDuration={5000}
                onRequestClose={this.handleRequestClose}
            />    
        </div>
      );
    }
  }


class ResponsiveNominationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Event: '',
            Filename: '',
            Description: '',
            form_disp: "flex",
            finishedDisp: "none",
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(event) {
        let param = event.target.placeholder   
        this.setState({[param] : event.target.value});
        }

    handleSubmit(event) {
        event.preventDefault();
        let submission = this.refs.droppy.state.uri;
        let Event = this.refs.choicy.state.eventList[this.refs.choicy.state.choice-1].title;
        let EventID = this.refs.choicy.state.eventList[this.refs.choicy.state.choice-1].event_id;
        let Filename = this.state.Filename;
        let Description = this.state.Description;
        let body = {
            "event":Event,
            "event_id":EventID,
            "filename":Filename,
            "description":Description,
            "submission":submission,
            "user_id":this.props.user_id
        }
        axios.post(`https://api.${process.env.REACT_APP_CLUSTER_NAME}.hasura-app.io/nominate`,body).then((result)=>{
            this.setState({form_disp:"none",finishedDisp:"block"});
        })
    }

    render() {
        return (
            <Paper zDepth={3} 
                className="FormWrapper" 
                style={{
                    width:this.props.container_width,
                    maxWidth: "100%",
                    height:this.props.container_height,
                    maxHeight: "100%",
                    marginTop: "25px"
                }}
            >    
            <form 
                className="Formy" 
                id="Formy" 
                onSubmit={this.handleSubmit} 
                style={{
                    display:this.state.form_disp,
                    flexDirection: "column",
                    }}>
                <h1>Nominate yourself.</h1>
                <DropDown ref="choicy" eventList={this.state.eventList} />
                <input 
                    placeholder="Filename" 
                    type="text" 
                    value={this.state.Filename} 
                    required 
                    onChange={this.handleChange} 
                    style={{width:this.props.fullWidth?"90%":"auto"}}
                />
                <input 
                    placeholder="Description" 
                    type="text" 
                    value={this.state.Description} 
                    required 
                    onChange={this.handleChange} 
                    style={{width:this.props.fullWidth?"90%":"auto"}}
                />
                <Droppy 
                    ref="droppy" 
                    droppy_width={this.props.droppy_width} 
                    droppy_height={this.props.droppy_height}
                    callback={()=>console.log("Image Uploaded.")}
                />
                <button>Send</button>
            </form>
            <Paper zDepth={1} className="DoneNominating" 
                style={{
                        display:this.state.finishedDisp,
                        marginTop:"25px",padding:"25px",
                        width:this.props.succes_width, marginLeft: "-75px"
                    }}>
                <span><b>Successfully Nominated yourself!</b></span>
                <img style={{width:this.props.succes_width,height:this.props.succes_height}} src="success.gif" alt="success"/>
            </Paper>     
            </Paper>
        );
    }
}

export default class NominationForm extends Component{
    render(){
        return(
            <Media query="(max-width: 1253px)">
                {matches =>
                matches ? (
                <ResponsiveNominationForm 
                    user_id={this.props.user_id}
                    container_width={(0.85*parseInt(window.innerWidth,10)).toString()+'px'}
                    container_height={(0.75*parseInt(window.innerHeight,10)).toString()+'px'}
                    succes_width={(0.75*parseInt(window.innerWidth,10)).toString()+'px'}
                    succes_height={(0.5*parseInt(window.innerHeight,10)).toString()+'px'}
                    droppy_width={(0.72*parseInt(window.innerWidth,10)).toString()+'px'}
                    droppy_height={(0.35*parseInt(window.innerHeight,10)).toString()+'px'}
                    fullWidth={true}
                    />
                    ) : (
                <ResponsiveNominationForm 
                    user_id={this.props.user_id}
                    container_width="max-content"
                    container_height="auto" 
                    succes_width="500px"
                    succes_height="500px"  
                    droppy_width="380px"
                    droppy_height="400px"  
                    />
                    )
                }
            </Media>
        )
    }
}