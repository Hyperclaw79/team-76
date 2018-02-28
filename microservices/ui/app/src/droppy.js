import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import axios from 'axios';

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
        let clusterName = process.env.REACT_APP_CLUSTER_NAME
        axios.post(
            `https://filestore.${clusterName}.hasura-app.io/v1/file`,
            file,
            {
                headers: {
                    "Content-Type": file.type
                },
                withCredentials: true
            }
        ).then((result)=>
        {
            let filelink = `https://filestore.${clusterName}.hasura-app.io/v1/file/` + result.data.file_id
            this.setState(
                {
                    display:"none",
                    uri:filelink,
                    obj_disp:"block"
                },
                this.props.callback()
            )
        }).catch((error)=>{
            console.log(error.response.data);
        });    
    }

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;
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