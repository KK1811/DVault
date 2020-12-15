import React, { Component } from 'react'
import { useState } from 'react'
import axios from "axios";
import DatePicker from "react-datepicker";
import { Navbar } from './navbar'
import cryptico from 'cryptico'
import Calendar from 'react-calendar'
import { NavLink } from 'react-router-dom'

import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';

class deadman extends Component {
    constructor(props){
        super(props)
        this.state = {
            fileName: '',
            ipfsHash: '',
            releaseDate: '',
            userId: '',
            createdFor: '',
            findEmail: '',
            publicKey: '',
            myTransactions: [],
            files:[],
            emailFound: '',
            emailNotFound:'',
            uploadMessage: '',
            errorMessage: '',
            fileText: '',
            fileExtension: 'txt',
            postedMessage: '',
            postedError: '',
            proofMessage: '',
            proofError: '',
            date: new Date
        }
    }

    componentDidMount(){
        this.getTransactions()
        this.sortByDate()
        //this.getFiles()
    }  

    // componentWillUpdate(){
    //     this.getTransactions()
    //     this.sortByDate()
    //     //this.getFiles()
    // }

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

    handleEmail = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    findEmail = (e) => {
        const url = "/users/getPubKey?email=" + this.state.findEmail;
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
        console.log(url)
        axios
            .get(url, config)
            .then((response) => {
                this.setState({createdFor: response.data.id, publicKey:response.data.publicKey, emailFound:'Email Found', emailNotFound:''})
                console.log(response.data)
                console.log(this.state)
            })
            .catch((error) => {
                console.log(error)
                this.setState({emailNotFound: 'Email Not Found', emailFound:''})
                console.log(this.state.emailNotFound)
            })
    }

    onDropdownSelected = (e) => {
        this.setState({
            fileName: e.target.value,
            //ipfsHash: e.target.id
        })
        var files = this.state.files.map((file)=>{
            console.log(file.name)
            if (file.name = e.target.value){this.setState({ipfsHash: file.ipfsHash})}
        })
        console.log(e.target.value)
        console.log(this.state.fileName)
        console.log(this.state.ipfsHash)
        console.log(this.state)
        return({files})

    }

    handleDateChange = (date) => {
        this.setState({
            releaseDate : date
        })
    }
    
    postTransaction = () => {
        const url = "/transactions/setTransaction";
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
        axios                                                                           //posting a new subscription
          .post(url, {
              fileName: this.state.fileName,
              ipfsHash: this.state.ipfsHash,
              releaseDate: this.state.releaseDate,
              userId: this.state.userId,
              createdFor: this.state.createdFor
          } , config)
          .then((response) => {
            console.log(response)
            this.setState({postedMessage: 'Posted'})
          })
          .catch((error) => {
            console.log(error.response);
            this.setState({postedError: 'Error'})
          });
      }

    getTransactions = () => {
        this.getPublicKey()
        const url = "/transactions/MyTransactions?userId="+this.state.userId;
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };

        axios
            .get(url, config)
            .then((response) => {
                console.log(response.data)
                this.setState({myTransactions: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }  

    proofOfLife = () => {
        const url = "/proofs/giveProof";
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
        this.getPublicKey()
        console.log(this.state)
        axios                                                                           //posting a new subscription
          .post(url, {
              userId: this.state.userId,
              months: 6
          } , config)
          .then((response) => {
            console.log(response)
            console.log(this.state)
            this.setState({proofMessage: "Proof of Life successfully registered"})
          })
          .catch((error) => {
            console.log(error.response);
            this.setState({proofError: "Error"})
          });
    }

    sortByDate = () => {
        var transactions = this.state.myTransactions
        this.setState({
            myTransactions: transactions.sort((a,b) => a.date > b.date)
        })
    }

    handleDate = (e) => {
        this.setState({releaseDate: e.target.value})
        console.log(this.state)
        console.log(e.target.value)
    }

    recordIpfs = (e) => {
        console.log(e)
    }

    showFile = async (e) => {

        var file = e.target.value
        const filename = file.substring(12,)
        // this.setname(filename)
        this.setState({fileName: filename})

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
        var config = {
        headers: { "token": token }
        };

        axios                                                                                              
            .get(url, config)
            .then((response) =>{
            this.setState({
                userId: response.data[0]._id,
            })
            //this.encryptData()
            }) 
            .catch((error) => {
                console.log(error.response)
            })
    }

    encryptData = () => {
        this.setState({uploadMessage: "Uploading File ...", errorMessage: ""})
        var EncryptionResult = cryptico.encrypt(this.state.fileText, this.state.publicKey);
        this.setState({encryptedData: EncryptionResult.cipher})
        this.uploadData(EncryptionResult.cipher)
    } 

    uploadData = () => {
        const url = "/files/upload";
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
              
        axios
          .post(url, {fileName: this.state.fileName, fileExtention: this.state.fileExtension, fileData: this.state.encryptedData, userId: this.state.userid}, config)
          .then((response) => {
            if(response.data.ipfsHash != ""){
                this.setState({ipfsHash: response.data.ipfsHash, uploadMessage:"File Uploaded", errorMessage: ""})
            }
          })
          .catch((error) => {
            console.log(error.response);
            this.setState({errorMessage: "Error", uploadMessage: ""})
          });
    } 

    date = () =>{
        const [startDate, setStartDate] = useState(new Date());
        return (
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        );

    }

    ReactCalendar = () => {
        const [date, setDate] = useState(new Date())
    }

    calendar = date => {
        this.setState({date})
        this.setState({releaseDate: date})
        console.log(this.state.releaseDate)
    }

    render(){

        var files = this.state.files.map((file) =>
            {return(<option key={file.ipfsHash} value={file.name}>{file.name}</option>)}
        );

        var transactions = this.state.myTransactions.map(transaction => {
            return(
                    <div className="row container list-group" >
                        <div className="list-group-item">
                        <div className="col-md-4 float-left">{transaction.filename}</div>
                        <div className="col-md-4 float-left">{transaction.releaseDate.substring(10,0)}</div>
                        <br/>
                        </div>
                    </div>
                )
            }
        )


        return(
            <div>
                <Navbar />
                <div className="row list-group">
                <div style={{"padding-left":"100px", "padding-bottom":"50px", "padding-top":"50px"}}><h3>Create a new Transaction</h3></div>
                    <tr>
                        <td>
                            <br/><br/>
                            <div className="container center" style={{"padding-left":"100px", "padding-bottom":"50px", "padding-top":"50px"}}><h4>Find Email</h4>
                                <input
                                    className="form-control"
                                    id="findEmail"
                                    onChange={this.handleEmail}
                                    type="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Email"
                                />

                                <p className="text-success">{this.state.emailFound}</p>
                                <p className="text-danger">{this.state.emailNotFound}</p>

                                <button className="btn btn-success center" onClick={this.findEmail}>Find</button>
                            </div>
                        </td>
                        
                        <td>
                            <br/><br/>
                            <div className="" style={{"padding-left":"200px", "padding-bottom":"20px", "padding-top":"30px"}}>
                                <div><h4>Upload File</h4></div>
                                <div className="add-media">

                                    <div style={{"padding-left":"0px", "padding-bottom":"30px", "padding-top":"25px"}}><input
                                        type="file"
                                        onChange={(e)=>{this.showFile(e)}}
                                    /> </div>

                                    <div style={{"padding-left":"0px", "padding-bottom":"20px", "padding-top":"20px"}}><button className="btn btn-success" onClick={this.encryptData}>Encrypt and Upload</button></div>
                                    {!this.state.errorMessage && (<p className="text-success" style={{"margin-left":"30px"}}> {this.state.uploadMessage}</p>)}
                                    <p className="text-danger" style={{"margin-left":"30px"}}> {this.state.errorMessage}</p>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div className="" style={{"padding-left":"150px", "padding-bottom":"50px", "padding-top":"20px"}}><h4>Set Release Date</h4>
                                <br/>
                                <Calendar 
                                    onChange={this.calendar}
                                    value={this.state.date}
                                />
                            </div>
                        </td>
                    </tr>

                    <div className="col-md-4 center container" style={{"padding-left":"100px", "padding-bottom":"50px", "padding-top":"20px"}}>
                        <button style={{"fontSize":"1.8em", "margin-left":"140px", "padding-left":"18px", "padding-bottom":"10px", "padding-top":"10px"}} className="btn btn-success" onClick={this.postTransaction}>Post</button>
                        <p className="text-success" style={{"margin-left":"150px"}}>{this.state.postedMessage}</p>
                        <p className="text-danger" style={{"margin-left":"170px"}}>{this.state.postedError}</p>
                    </div>

                    <br /><br /><br /><br />
                    <div style={{"padding-left":"100px", "padding-bottom":"50px", "padding-top":"50px"}}><h3>My Transactions</h3></div>
                    {transactions}
                    <br/><br/>
                    <NavLink to='/publictransactions'><button type="button" className="btn btn-success btn-lg right" style={{ "margin-left":"100px" }}>View Public Transactions</button></NavLink>
                </div>
            </div>    
        )
    }

}

export default deadman;