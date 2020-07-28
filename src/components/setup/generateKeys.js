import React, { Component } from 'react'
import cryptico from 'cryptico'
import axios from "axios";
import { Link } from 'react-router-dom'

class generateKeys extends Component {
    state = {
        password: "",
        message: "",
        publicKey: "",
        privateKey: {}
    };

    generate = () => {
        
        this.setState(
            {message: "Please wait ..."}
        )

        var passPhrase = this.state.password; 
 
        var bits = 1024; 
 
        var userRSAkey = cryptico.generateRSAKey(passPhrase, bits);

        var userPublicKey = cryptico.publicKeyString(userRSAkey); 

        console.log(userRSAkey);
        console.log(userPublicKey);

        localStorage.setItem('RSAKey', JSON.stringify(userRSAkey));
        localStorage.setItem('publicKey', userPublicKey)
        var pkey= localStorage.getItem('publicKey')
        console.log(pkey)
        // this.state.publicKey = "Keys generated"
        this.setState(
            {              
                message: "Keys Generated"
            }
        )

        console.log(this.state.publicKey)
        console.log(this.state.privateKey)
            this.uploadKey(userPublicKey)
        
    }

    uploadKey = (userPublicKey) => {
        const url = "/users/generateKeys";
        console.log(userPublicKey)
        var token = localStorage.getItem("token");
        var config = {
        headers: { "token": token }
        };
        axios
          .post(url, {publicKey: userPublicKey}, config)
          .then((response) => {
            console.log(response.data);
          
            this.props.history.push(`/upload`)
          })
          .catch((error) => {
            console.log(error.response);
          });
    }
 
    render(){
        const {password} = this.state.password;
        return(
            <div className="container col-md-5">
                <div style={{"padding-left":"280px", "padding-top":"50px", "padding-bottom":"50px"}}><h3>Generate Keys</h3></div>
                <h6>Please Enter your password to generate keys</h6>
                <br/><br/>
                <input
                className="form-control"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                placeholder="Password"
                />
                <br/><br/><br/>
                <div style={{"padding-left":"280px", "padding-bottom":"50px"}}><button className="btn btn-success" onClick={this.generate}>Generate Keys</button></div>
                <div style={{"padding-left":"290px", "padding-bottom":"50px"}}><p className="text-success">{this.state.message}</p></div>
            </div>
        )
    }


}

export default generateKeys;