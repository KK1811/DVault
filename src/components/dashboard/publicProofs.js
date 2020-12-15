import React, { Component } from 'react'
import { useState } from 'react'
import axios from "axios";
import DatePicker from "react-datepicker";
import { Navbar } from './navbar'
import cryptico from 'cryptico'
import Calendar from 'react-calendar'

import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';

class publicproofs extends Component {
    constructor(props){
        super(props)
        this.state = {
            allProofs: [],
            proofError: ''
        }
    }

    componentDidMount(){
        this.getPublicKey()
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
            this.setState({ userId: response.data[0]._id })
            this.getAllProofs()
            this.getMyProofs()
            }) 
            .catch((error) => {
                console.log(error.response)
            })
    }

    getAllProofs = () => {
        const url = "/proofs/myProofs";
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };

        axios
            .get(url, config)
            .then((response) => {
                console.log(response.data)
                this.setState({allProofs: response.data})
            })
            .catch((error) => {
                console.log(error)
                this.setState({proofError: "Error"})
            })
    }

    render(){

        var allproofs = this.state.allProofs.map(proof => {
            return(
                    <div className="row container list-group" >
                        <div className="list-group-item">
                        <div className="col-md-4 float-left" style={{"padding-left":"100px"}}>{proof.userId}</div>
                        <div className="col-md-3 float-left" style={{"padding-left":"100px"}}>{proof.dateIssued.substring(10,0)}</div>
                        <div className="col-md-3 float-left" style={{"padding-left":"80px"}}>{proof.dateIssued.substring(11,16)}</div>
                        <div className="col-md-2 float-left" style={{"padding-left":"60px"}}>{proof.months}</div>
                        <br/>
                        </div>
                    </div>
                )
            }
        )

        return(
            <div>
                <Navbar />
                
                    <br /><br />
                    <div className="container center" style={{"padding-left":"400px", "padding-bottom":"50px", "padding-top":"50px"}}><h3>Public Proof of Life</h3></div>
                    <tr>
                        <td style={{"padding-left":"520px", "padding-top":"50px"}}><h5>User ID</h5></td>
                        <td style={{"padding-left":"200px", "padding-top":"50px"}}><h5>Issued Date</h5></td>
                        <td style={{"padding-left":"150px", "padding-top":"50px"}}><h5>Time</h5></td>
                        <td style={{"padding-left":"150px", "padding-top":"50px"}}><h5>Months Extended</h5></td>
                    </tr>
     
                    <div style={{"padding-left":"350px", "padding-bottom":"50px", "padding-top":"50px"}}>
                        {allproofs}
                    </div>
                    <p className="text-danger">{this.state.proofError}</p>
                    
                   
            </div>    
        )
    }

}

export default publicproofs;