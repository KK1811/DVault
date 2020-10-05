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
            })
            .catch((error) => {
                console.log(error)
            })
    }  

    render(){
        return(
            <div><Navbar />
                <div className="container">
                    <div style={{"padding-left":"480px", "padding-bottom":"50px", "padding-top":"50px"}}><h4>My files</h4></div>
                </div>
            </div>
        )
    }
}

export default download;