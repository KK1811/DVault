import React, { Component } from 'react'
import cryptico from 'cryptico'
import axios from "axios";
import { Navbar } from './navbar'

class download extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            fileText: "",
            fileName: "",
            fileExtension: "txt",
            files:[],
            receivedFiles: [],
            RSAKey:"",
            password:"",
            encryptedData:"",
            showFiles: false
        }
      }

    componentDidMount(){
        this.getFiles()
        this.getTransactions()
    }  

    getFiles = () => {
        const url = "/files/myFiles";
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };

        axios
            .get(url, config)
            .then((response) => {
                this.setState({files: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }  

    downloadFile = e => {
        this.setState({fileName: e.target.id})
        console.log(e.target.value)
        const url = '/files/getFile?cid=' + e.target.value
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };

        axios
            .get(url, config)
            .then((response) => {
                this.setState({encryptedData: response.data.fileData})
                console.log(response.data)
                this.decryptData(response.data.fileData)
                this.makeFile()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    decryptData = (data) => {
        console.log(data)
        var userRSAkey = cryptico.generateRSAKey(this.state.password, 1024);
        var decryptedData = cryptico.decrypt(data, userRSAkey)
        this.setState({fileText: decryptedData.plaintext})
    }

    makeFile = () => {
        const element = document.createElement("a");
        const file = new Blob([this.state.fileText], {type: 'text'});
        element.href = URL.createObjectURL(file);
        element.download = this.state.fileName;
        document.body.appendChild(element); 
        element.click();
    }

    handleChange = e => {                                             
        this.setState({
            [e.target.id]: e.target.value
          });
      };

    showFiles = () => {
        if(this.state.password){
            this.setState({showFiles: true})
        }
    }  

    getTransactions = () => {
        const url = "/users/myInfo?publicKey=true"
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
        var geturl;
        axios                                                                                              
            .get(url, config)
            .then((response) =>{
            geturl = "/transactions/MyTransactions?completed=true&createdFor=" + response.data[0]._id;
            console.log(this.state)
                axios
                .get(geturl, config)
                .then((response) => {
                    console.log(response)
                    this.setState({receivedFiles: response.data})
                })
                .catch((error) => {
                    console.log(error)
                })
            }) 
            .catch((error) => {
                console.log(error.response)
            })
    }  

    render(){
        var files = this.state.files.map(file => {
            return(
                <div className="card col-md-3 float-left" style={{"margin-left":"20px", "padding-left":"20px", "padding-bottom":"20px", "padding-top":"20px", "max-width":"20rem"}} >
                    <div className="container" style={{"margin-right":"50px", "margin-left":"70px"}}>{file.name}</div>
                    <br/>
                    <button 
                    className="btn btn-success" 
                    style={{"margin-right":"50px", "margin-top":"10px", "margin-left":"50px"}}
                    onClick={this.downloadFile} 
                    value={file.ipfsHash} 
                    id={file.name}>
                        Download
                    </button>
                </div>
                )
            }
        )

        var receivedfiles = this.state.receivedFiles.map(file => {
            return(
                <div className="card col-md-3 float-left" style={{"margin-left":"20px", "padding-left":"20px", "padding-bottom":"20px", "padding-top":"20px", "max-width":"20rem"}} >
                    <div className="container" style={{"margin-right":"50px", "margin-left":"70px"}}>{file.fileName}</div>
                    
                    <br/>
                    <button 
                    className="btn btn-success" 
                    style={{"margin-right":"50px", "margin-top":"10px", "margin-left":"50px"}}
                    onClick={this.downloadFile} 
                    value={file.ipfsHash} 
                    id={file.FileName}>
                        Download
                    </button>
                </div>
                )
            }
        )
        
        return(
            <div><Navbar />
                <div className="container">

                {!this.state.showFiles && (
                    <div style={{"padding-left":"350px", "padding-bottom":"50px", "padding-top":"200px"}} className="col-md-8">
                        <label htmlFor="exampleInputPassword1">Please enter your Password to continue</label>
                        <input
                        className="form-control"
                        id="password"
                        onChange={this.handleChange}
                        type="password"
                        placeholder="Password"
                        />

                        <button 
                            onClick={this.showFiles} 
                            className="btn btn-success"
                            style={{"margin-left":"140px", "margin-bottom":"50px", "margin-top":"50px"}} 
                        >Continue</button>
                    </div>   
                )}    
                
                 <div className="container" style={{"margin-top": "50px", "margin-bottom": "50px"}}>     
                    {this.state.showFiles && (<div style={{"padding-left":"480px", "padding-bottom":"50px", "padding-top":"50px"}}><h4>My files</h4></div>)}
                    {this.state.showFiles && (<div>{files}</div>)}
                </div>
                <br/><br/><br/><br/>   
                <div style={{"padding-top": "500px"}}>   
                    {this.state.showFiles && (<div style={{"padding-left":"470px", "padding-bottom":"50px", "padding-top":"100px"}}><h4>Received files</h4></div>)}
                    {this.state.showFiles && (<div>{receivedfiles}</div>)}
                </div>    
                </div>
            </div>
        )
    }
}

export default download;