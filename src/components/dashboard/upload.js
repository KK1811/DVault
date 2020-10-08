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

        console.log(e.target.value)
        var file = e.target.value
        const filename = file.substring(12,)
        this.setname(filename)

        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result)
        //   console.log(e.target.value)
          this.setState({fileText: text})
          console.log(this.state.fileText)
        //   alert(text)
        };
        reader.readAsText(e.target.files[0])
    }

    setname = (fname) =>{
        localStorage.setItem('fileName', fname)
        var name = localStorage.getItem('fileName')
        console.log(name)
    }

    // handleInput = (e) => {
    //     console.log(e.target.value)
    // }

    getPublicKey = () => {
        // const url = "/users/myInfo?publicKey=true"
            const url = "/users/myInfo?publicKey=true"
            var token = localStorage.getItem("token");
            this.setState({uploadMessage: "Uploading File ..."})
            var config = {
            headers: { "token": token }
            };
            console.log(token)
            axios                                                                                              
                .get(url, config)
                .then((response) =>{
                console.log(response.data[0]._id)
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
        // this.getPublicKey()
        // var pkey= localStorage.getItem('publicKey')
        var EncryptionResult = cryptico.encrypt(this.state.fileText, this.state.publicKey);
        this.setState({encryptedData: EncryptionResult.cipher})
        console.log(EncryptionResult.cipher)
        this.uploadData(EncryptionResult.cipher)
        // this.uploadData()
    } 

    uploadData = (data) => {
        const url = "/files/upload";
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
        
        // console.log(this.state)
        var body = JSON.stringify({fileName: localStorage.getItem('fileName'), fileExtention: this.state.fileExtension, fileData: this.state.encryptedData, userId: this.state.userid})
        console.log(body)
        var file = localStorage.getItem('fileName')
        axios
          .post(url, {fileName: file, fileExtention: this.state.fileExtension, fileData: this.state.encryptedData, userId: this.state.userid}, config)
          .then((response) => {
            console.log(response.data.ipfsHash);
            if(response.data.ipfsHash != ""){
                this.setState({uploadMessage:"File Uploaded"})
            }
            console.log(this.state.uploadMessage)
          })
          .catch((error) => {
            console.log(error.response);
            // this.setState({errorMessage: error.response.data})
          });
    } 

    render(){
        return(
            <div><Navbar />
            <div className="container">
                <div style={{"padding-left":"480px", "padding-bottom":"50px", "padding-top":"50px"}}><h4>Upload File</h4></div>
                <div className="add-media">
                {/* <input id="myInput"
                    type="file"
                    ref={(ref) => this.upload = ref}
                    style={{display: 'none'}}
                    onChange={this.onChangeFile.bind(this)}
                    />

                    <button
                        label="Open File"
                        primary={false}
                        onClick={()=>{this.upload.click()}}
                    >Open File </button> */}

                    <div style={{"padding-left":"450px", "padding-bottom":"50px", "padding-top":"50px"}}><input
                        type="file"
                        onChange={(e)=>{this.showFile(e)}}
                    /> </div>

                    {/* <input
                        type="file"
                        onChange={(e)=>{this.handleInput(e)}}
                    />  */}

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