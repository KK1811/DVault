import React, { Component } from 'react'
import cryptico from 'cryptico'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Navbar } from './navbar'

class download extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            fileText: "",
            fileName: "",
            fileExtension: "txt",
            files:[],
            RSAKey:"",
            password:"",
            encryptedData:""
        }
      }

    componentDidMount(){
        this.getFiles()
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
                console.log(response.data)
                this.setState({files: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }  

    downloadFile = e => {
        console.log(e.target.value)
        console.log(e.target.id)
        this.setState({fileName: e.target.id})
        const url = '/files/getFile?cid=' + e.target.value
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };

        axios
            .get(url, config)
            .then((response) => {
                console.log(response.data)
                this.setState({encryptedData: response.data.fileData})
                console.log(this.state.fileText)
                // console.log(this.state.fileText)
                // console.log(this.state.RSAKey)
                // console.log(JSON.parse(this.state.RSAKey))
                // var key = JSON.parse(this.state.RSAKey)
                // var decryptedData = cryptico.decrypt(this.state.fileText.toString(), key)
                // console.log(decryptedData.plaintext)
                this.decryptData()
                this.makeFile()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    decryptData = () => {
        console.log(this.state.fileText)
        // console.log(JSON.parse(this.state.RSAKey))
        var userRSAkey = cryptico.generateRSAKey(this.state.password, 1024);
        var decryptedData = cryptico.decrypt(this.state.encryptedData, userRSAkey)
        console.log(decryptedData.plaintext)
        this.setState({fileText: decryptedData.plaintext})
    }

    makeFile = () => {
        const element = document.createElement("a");
        console.log(this.state.fileText)
        const file = new Blob([this.state.fileText], {type: 'text'});
        element.href = URL.createObjectURL(file);
        element.download = this.state.fileName;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    // showFile = async (e) => {

    //     console.log(e.target.value)
    //     console.log(e.target.result)
    //     console.log(e.target)
    //     var file = e.target.value
    //     // const filename = file.substring(12,)
    //     // this.setname(filename)

    //     e.preventDefault()
    //     const reader = new FileReader()
    //     reader.onload = async (e) => { 
    //         // console.log(reader)
    //       const text = (e.target.result)
    //       console.log(text)
    //       console.log(e.target.result)
    //     //   console.log(e.target.value)
    //       this.setState({RSAKey: cryptico.generateRSAKey(this.state.password, 1024)})
    //     //   console.log(JSON.parse(this.state.RSAKey))
    //     //   alert(text)
    //     };
    //     reader.readAsText(e.target.files[0])
    // }

    handleChange = e => {                                             
        this.setState({
            [e.target.id]: e.target.value
          });
      };

    render(){
        var files = this.state.files.map(file => {
            return(
                <div>{file.name}<button onClick={this.downloadFile} value={file.ipfsHash} id={file.name}>Download</button></div>
            )
        }

        )
        return(
            <div><Navbar />
                <div className="container">

                <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      className="form-control"
                      id="password"
                      onChange={this.handleChange}
                      type="password"
                      placeholder="Password"
                    />

                <div style={{"padding-left":"480px", "padding-bottom":"50px", "padding-top":"50px"}}><h4>My files</h4></div>
                    {files}
                </div>
        
                {/* <div style={{"padding-left":"450px", "padding-bottom":"50px", "padding-top":"50px"}}>Open RSA Key
                    <input type="file" onChange={(e)=>{this.showFile(e)}}/> 
                </div> */}
            
            </div>
        )
    }
}

export default download;