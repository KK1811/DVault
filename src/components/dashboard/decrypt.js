import React, { Component } from 'react'
import cryptico, { RSAKey } from 'cryptico'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Navbar } from './navbar'

class decrypt extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            fileText: "",
            fileName: "",
            fileExtension: "txt",
            userid:"",
            publicKey:"",
            encryptedData:"",
            RSAKey:{},
            password:"Password1"
        }
      }

      handleChange = e => {                                               //changing state according to the change in input fields
        this.setState({
            [e.target.id]: e.target.value
          });
      };  

    handleEncryption = () => {
        this.getPublicKey()
    } 

    getPublicKey = () => {
        const url = "/users/myInfo?publicKey=true"
        var token = localStorage.getItem("token");
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
        var EncryptionResult = cryptico.encrypt(this.state.fileText, this.state.publicKey.toString());
        this.setState({encryptedData: EncryptionResult.cipher})
        console.log(EncryptionResult)
        // this.uploadData(EncryptionResult.cipher)
        // this.uploadData()
    } 

    showFile = async (e) => {

        console.log(e.target.value)
        console.log(e.target.result)
        console.log(e.target)
        var file = e.target.value
        // const filename = file.substring(12,)
        // this.setname(filename)

        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
            // console.log(reader)
          const text = (e.target.result)
          console.log(text)
          console.log(e.target.result)
        //   console.log(e.target.value)
          this.setState({RSAKey: cryptico.generateRSAKey(this.state.password, 1024)})
        //   console.log(this.state.fileText)
        //   alert(text)
        };
        reader.readAsText(e.target.files[0])

        this.decryptData()
    }

    decryptData = () => {
        var userRSAkey = cryptico.generateRSAKey(this.state.password, 1024);
        var decryptedData = cryptico.decrypt(this.state.encryptedData, userRSAkey)
        console.log(decryptedData.plaintext)
    }

    render(){
        return(
            <div><Navbar />
                <div className="container">
                    <div style={{"padding-left":"480px", "padding-bottom":"50px", "padding-top":"50px"}}><h4>My files</h4></div>
                    <input
                      className="form-control"
                      id="fileText"
                      onChange={this.handleChange}
                      type="text"
                      placeholder="text"
                    />
                    <button onClick={this.handleEncryption}>Encrypt</button>
                    <h4>{ this.state.encryptedData }</h4>
                    <div style={{"padding-left":"450px", "padding-bottom":"50px", "padding-top":"50px"}}><input
                        type="file"
                        onChange={(e)=>{this.showFile(e)}}
                    /> </div>
                </div>
            </div>
        )
    }
}

export default decrypt;