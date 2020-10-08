import React, { Component } from 'react'
import cryptico from 'cryptico'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Navbar } from './navbar'

class upload extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            fileText: "",
            fileName: "",
            fileExtension: "txt",
            userid: "",
            publicKey:"",
            name:"",
            uploadMessage:"",
            errorMessage:""
        }
      }

    showFile = async (e) => {

        var file = e.target.value
        const filename = file.substring(12,)
        this.setname(filename)

        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result)
          this.setState({fileText: text})
        };

        reader.readAsText(e.target.files[0])
    }

    setname = (fname) =>{
        localStorage.setItem('fileName', fname)
        var name = localStorage.getItem('fileName')
    }

    getPublicKey = () => {
            const url = "/users/myInfo?publicKey=true"
            var token = localStorage.getItem("token");
            this.setState({uploadMessage: "Uploading File ..."})
            var config = {
            headers: { "token": token }
            };

            axios                                                                                              
                .get(url, config)
                .then((response) =>{
                this.setState({
                    userid: response.data[0]._id,
                    publicKey: response.data[0].publicKey
                })
                this.encryptData()
                }) 
                .catch((error) => {
                    console.log(error.response)
                })
        
    }

    encryptData = () => {
        var EncryptionResult = cryptico.encrypt(this.state.fileText, this.state.publicKey);
        this.setState({encryptedData: EncryptionResult.cipher})
        this.uploadData(EncryptionResult.cipher)
    } 

    uploadData = (data) => {
        const url = "/files/upload";
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
        
        var body = JSON.stringify({fileName: localStorage.getItem('fileName'), fileExtention: this.state.fileExtension, fileData: this.state.encryptedData, userId: this.state.userid})
        var file = localStorage.getItem('fileName')
        
        axios
          .post(url, {fileName: file, fileExtention: this.state.fileExtension, fileData: this.state.encryptedData, userId: this.state.userid}, config)
          .then((response) => {
            if(response.data.ipfsHash != ""){
                this.setState({uploadMessage:"File Uploaded"})
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
    } 

    render(){
        return(
            <div><Navbar />
            <div className="container">
                <div style={{"padding-left":"480px", "padding-bottom":"50px", "padding-top":"50px"}}><h4>Upload File</h4></div>
                <div className="add-media">

                    <div style={{"padding-left":"450px", "padding-bottom":"50px", "padding-top":"50px"}}><input
                        type="file"
                        onChange={(e)=>{this.showFile(e)}}
                    /> </div>

                    <div style={{"padding-left":"460px", "padding-bottom":"50px", "padding-top":"50px"}}><button className="btn btn-success" onClick={this.getPublicKey}>Encrypt and Upload</button></div>
                    {!this.state.errorMessage && (<p className="text-success" style={{"margin-left":"480px"}}> {this.state.uploadMessage}</p>)}
                    <p className="text-danger" style={{"margin-left":"480px"}}> {this.state.errorMessage}</p>
                </div>
            </div>
            </div>
        )
    }
}

export default upload;