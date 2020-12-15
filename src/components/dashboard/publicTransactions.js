import React, { Component } from 'react'
import { useState } from 'react'
import axios from "axios";
import DatePicker from "react-datepicker";
import { Navbar } from './navbar'
import cryptico from 'cryptico'
import Calendar from 'react-calendar'

import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';

class publictransactions extends Component {
    constructor(props){
        super(props)
        this.state = {
            myTransactions: [],
        }
    }

    componentDidMount(){
        this.getTransactions()
        this.sortByDate()
        //this.getFiles()
    }  

    getTransactions = () => {
        const url = "/transactions/MyTransactions";
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

    sortByDate = () => {
        var transactions = this.state.myTransactions
        this.setState({
            myTransactions: transactions.sort((a,b) => a.date > b.date)
        })
    }

    render(){

        var transactions = this.state.myTransactions.map(transaction => {
            return(
                    <div className="row container list-group" >
                        <div className="list-group-item">
                        <div className="col-lg-3 float-left">{transaction.createdBy}</div>
                        <div className="col-lg-2 float-left">{transaction.createdDate.substring(10,0)}</div>
                        <div className="col-lg-2 float-left">{transaction.releaseDate.substring(10,0)}</div>
                        <div className="col-lg-4 float-left">{transaction.fileName}</div>
                        <div className="col-lg-5 float-right">{transaction.ipfsHash}</div>

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
                    <br /><br /><br /><br />
                    <div style={{"padding-left":"100px", "padding-bottom":"50px", "padding-top":"50px"}}><h3>Public Transactions</h3></div>
                    {transactions}
                </div>
            </div>    
        )
    }

}

export default publictransactions;