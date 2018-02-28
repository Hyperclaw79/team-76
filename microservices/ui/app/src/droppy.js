import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import axios from 'axios';

export default class Droppy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "block",
            uri: null,
            obj_disp: "none",
            blob:''
        }

        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/*,video/*,document/*,text/*",
            autoProcessQueue: false,
            dictDefaultMessage: "Upload your submission here."   
        };

        this.componentConfig = {
            dropzoneSelector: '#fin',
            showFiletypeIcon: false,
            postUrl: 'no-url'
        };
    }

    filestore = (file) => {
        let clusterName = process.env.REACT_APP_CLUSTER_NAME
        if(!this.props.skipFS) {
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
                this.setState({uri:filelink}, this.props.callback())
            }).catch((error)=>{
                console.log(error);
            })
        }
        else{
            this.props.callback(file)
        }
    }

    handleFileAdded(file) {
        this.setState(
            {
                display:"none",
                obj_disp:"block",
                blob:URL.createObjectURL(file)
            },
            this.filestore(file)
        );    
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
                    data={this.state.blob} 
                    style={{display:this.state.obj_disp,width:this.props.droppy_width,marginLeft:"20px",minHeight:this.props.droppy_height}} 
                    align="center" 
                    form="Formy"
                    aria-label="obj-placeholder"/>
            </div>
        )
    }
}