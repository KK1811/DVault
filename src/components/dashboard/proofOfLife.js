import React, { Component } from 'react'
import axios from "axios";
import { Navbar } from './navbar'
import { NavLink } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';

class proof extends Component {
    constructor(props){
        super(props)
        this.state = {
            userId: '',
            myProofs: [],
            proofMessage: '',
            proofError: ''
        }
    }

    componentDidMount(){
        this.getPublicKey()
    }  

    proofOfLife = (e) => {
        const url = "/proofs/giveProof";
        var token = localStorage.getItem("token");
        console.log(e.target.value)
        var month = e.target.value
        var config = {
        headers: { "token": token }
        };
        this.getPublicKey()
        console.log(this.state)
        axios                                                                           
          .post(url, {
              userId: this.state.userId,
              months: month
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
            this.getMyProofs()
            }) 
            .catch((error) => {
                console.log(error.response)
            })
    }

    getMyProofs = () => {
        console.log(this.state)
        const url = "/proofs/myProofs?userId="+this.state.userId;
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };

        axios
            .get(url, config)
            .then((response) => {
                console.log(response.data)
                this.setState({myProofs: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render(){

        var myproofs = this.state.myProofs.map(proof => {
            return(
                    <div className="row container list-group">
                        <div className="list-group-item">
                        <div className="col-md-4 float-left" style={{"padding-left":"120px"}}>{proof.dateIssued.substring(10,0)}</div>
                        <div className="col-md-4 float-left" style={{"padding-left":"120px"}}>{proof.dateIssued.substring(11,16)}</div>
                        <div className="col-md-4 float-left" style={{"padding-left":"120px"}}>{proof.months}</div>
                        <br/>
                        </div>
                    </div>
                )
            }
        )

        return(
            <div>
                <Navbar />
                
                <div className="container center" style={{"padding-left":"400px", "padding-bottom":"50px", "padding-top":"50px"}}><h3>Give Proof of Life</h3></div>

                <div className="container center" style={{"padding-left":"360px", "padding-bottom":"50px", "padding-top":"50px"}}>
                    <button className="btn btn-success" value={1} onClick={this.proofOfLife} style={{"margin-left":"0px"}}>1 Month</button>
                    <button className="btn btn-success" value={3} onClick={this.proofOfLife} style={{"margin-left":"40px"}}>3 Months</button>
                    <button className="btn btn-success" value={6} onClick={this.proofOfLife} style={{"margin-left":"40px"}}>6 Months</button>
                    <br />
                    <p className="text-success">{this.state.proofMessage}</p>
                    <p className="text-danger">{this.state.proofError}</p>
                </div>
                    <br /><br /><br /><br />
                    <div className="container center" style={{"padding-left":"400px", "padding-bottom":"50px", "padding-top":"50px"}}><h3>My Proof of Life</h3></div>
                    <tr>
                        <td style={{"padding-left":"450px", "padding-top":"50px"}}><h5>Issued Date</h5></td>
                        <td style={{"padding-left":"260px", "padding-top":"50px"}}><h5>Time</h5></td>
                        <td style={{"padding-left":"250px", "padding-top":"50px"}}><h5>Months Extended</h5></td>
                    </tr>
                    <div style={{"padding-left":"350px", "padding-bottom":"50px"}}>
                        {myproofs}
                    </div>                  

                    <NavLink to='/publicproofs'><button type="button" className="btn btn-success btn-lg right" style={{ "margin-left":"750px" }}>View Public Proofs</button></NavLink>     
            </div>    
        )
    }
}

export default proof;