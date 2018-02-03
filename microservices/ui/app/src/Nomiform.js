import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import './formy.css'
import Paper from 'material-ui/Paper';


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

export default class NominationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Event: '',
            Filename: '',
            Description: '',
            form_disp: "block",
            finishedDisp: "none"
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        let param = event.target.placeholder   
        this.setState({[param] : event.target.value});
      }
    
      handleSubmit(event) {
        let ev = event  
        let submission = this.refs.droppy.state.uri;
        let Event = this.state.Event
        let Filename = this.state.Filename
        let Description = this.state.Description
        alert("Event: "+Event+"\nFilename: "+Filename+"\nDescription: "+Description+"\nSubmission: "+submission);
        this.setState({form_disp:"none",finishedDisp:"block"});
        ev.preventDefault();
      }
    
      render() {
        return (
           <Paper zDepth={3} className="FormWrapper">    
            <form className="Formy" id="Formy" onSubmit={this.handleSubmit} style={{display:this.state.form_disp}}>
                <h1>Nominate yourself.</h1>
                <input placeholder="Event" type="text" value={this.state.Event} required onChange={this.handleChange} />
                <input placeholder="Filename" type="text" value={this.state.Filename} required onChange={this.handleChange} />
                <input placeholder="Description" type="text" value={this.state.Description} required onChange={this.handleChange} />
                <Droppy ref="droppy" />
                <button>Send</button>
            </form>
            <Paper zDepth={1} className="DoneNominating" style={{display:this.state.finishedDisp,marginTop:"25px",padding:"25px"}}>
                <span><b>Successfully Nominated yourself!</b></span>
                <img style={{width:"500px",height:"500px"}} src="success.gif" />
            </Paper>     
           </Paper>
        );
      }
}