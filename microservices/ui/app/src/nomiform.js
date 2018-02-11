import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';

class Droppy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "block",
            uri: null,
            obj_disp: "none"
        }

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/*,video/*,document/*",
            autoProcessQueue: false,
            dictDefaultMessage: "Upload your submission here."   
        };

        this.componentConfig = {
            dropzoneSelector: '#fin',
            showFiletypeIcon: false,
            postUrl: 'no-url'
        };
    }

    handleFileAdded(file) {
        let temp = URL.createObjectURL(file)
        this.setState({display:"none",uri:temp,obj_disp:"block"})
    }

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            addedfile: this.handleFileAdded.bind(this)
        }

        return (
            <div className="FinWrapper" style={{display:this.state.finDisp}}>
                <div id="fin" style={{display:this.state.display,width:"380px",margin:"auto"}}>
                    <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}>
                        <div className="dz-message">Upload your submission here.</div>
                    </DropzoneComponent>
                </div>
                <object 
                    ref="object_placeholder" 
                    data={this.state.uri} 
                    style={{display:this.state.obj_disp,width:"380px",marginLeft:"20px",minHeight:"400px"}} 
                    align="center" 
                    form="Formy"
                    aria-label="obj-placeholder"/>
            </div>
        )
    }
}

class DropDown extends React.Component {

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
              "title": ""
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

export default class NominationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Event: '',
            Filename: '',
            Description: '',
            form_disp: "block",
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
        let Filename = this.state.Filename;
        let Description = this.state.Description;
        let body = {
            "event":Event,
            "filename":Filename,
            "description":Description,
            "submission":submission
        }
        axios.post(`https://api.${process.env.REACT_APP_CLUSTER_NAME}.hasura-app.io/nominate`,body).then((result)=>{
            this.setState({form_disp:"none",finishedDisp:"block"});
        })
      }
    
      render() {
        return (
           <Paper zDepth={3} className="FormWrapper">    
            <form className="Formy" id="Formy" onSubmit={this.handleSubmit} style={{display:this.state.form_disp}}>
                <h1>Nominate yourself.</h1>
                <DropDown ref="choicy" eventList={this.state.eventList} />
                <input placeholder="Filename" type="text" value={this.state.Filename} required onChange={this.handleChange} />
                <input placeholder="Description" type="text" value={this.state.Description} required onChange={this.handleChange} />
                <Droppy ref="droppy" />
                <button>Send</button>
            </form>
            <Paper zDepth={1} className="DoneNominating" 
                style={{
                        display:this.state.finishedDisp,
                        marginTop:"25px",padding:"25px",
                        width:"550px", marginLeft: "-75px"
                    }}>
                <span><b>Successfully Nominated yourself!</b></span>
                <img style={{width:"500px",height:"500px"}} src="success.gif" alt="success"/>
            </Paper>     
           </Paper>
        );
      }
}