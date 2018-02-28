import React from 'react';
import DropzoneComponent from 'react-dropzone-component';

export default class Droppy extends React.Component {
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
        //let temp = URL.createObjectURL(file)
        let temp = file;
        this.setState(
            {
                display:"none",
                uri:temp,
                obj_disp:"block"
            },
            this.props.callback()
        )
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
                <div 
                    id="fin" 
                    style={{
                        display:this.state.display,
                        width:this.props.droppy_width,
                        margin:"auto",
                        maxWidth:"100%"
                    }}
                >
                    <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}>
                        <div className="dz-message">Upload your submission here.</div>
                    </DropzoneComponent>
                </div>
                <object 
                    ref="object_placeholder" 
                    data={this.state.uri} 
                    style={{display:this.state.obj_disp,width:this.props.droppy_width,marginLeft:"20px",minHeight:this.props.droppy_height}} 
                    align="center" 
                    form="Formy"
                    aria-label="obj-placeholder"/>
            </div>
        )
    }
}