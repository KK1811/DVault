import React, { Component } from 'react'
import cryptico from 'cryptico'
import axios from "axios";
import { Link } from 'react-router-dom'

class generateKeys extends Component {
    state = {
        password: "",
        message: "",
        matchPassword: false,
        passwordError: ""
    };

    confirmPassword = e => {                                                       //checking if passwords match
        // this.handleChange(e)
        if(this.state.password === e.target.value){
          this.setState({
              matchPassword: true,
              passwordError: ""
          });
        }else{
            this.setState({
                matchPassword: false,
                passwordError: "Passwords don't match"
            });
        }
    };

    generate = () => {
        
        this.setState(
            { message: "Please wait ..." }
        )

        var passPhrase = this.state.password; 
        var bits = 1024; 
 
        var userRSAkey = cryptico.generateRSAKey(passPhrase, bits);
        var userPublicKey = cryptico.publicKeyString(userRSAkey); 

        console.log(userRSAkey)

        var RSAKeyString = JSON.stringify(userRSAkey)
        var RSAKeyJSON = JSON.parse(RSAKeyString)

        console.log(RSAKeyJSON)

        // console.log(JSON.stringify(userRSAkey.dmp1))
        // console.log(JSON.stringify(userRSAkey))
        
        // var coeff = userRSAkey.coeff
        // var d = userRSAkey.d
        // var dmp1 = userRSAkey.dmp1
        // var dmq1 = userRSAkey.dmq1
        // var e = userRSAkey.e
        // var n = userRSAkey.n
        // var p = userRSAkey.p
        // var q = userRSAkey.q

        // var RSAKey = {'coeff': coeff, 'd': d, 'dmp1': dmp1, 'dmq1': dmq1, 'e': e, 'n': n, 'p': p, 'q': q}
        // console.log(RSAKey)
        // console.log(JSON.stringify(RSAKey))

        // this.downloadFile(JSON.stringify(RSAKey))
        this.uploadKey(userPublicKey)
        
        this.setState(
            { message: "Keys Generated" }
        )

        this.props.history.push(`/upload`)
    }

    downloadFile = (key) => {
        const element = document.createElement("a");
        console.log(key)
        const file = new Blob([key], {type: 'JSON'});
        element.href = URL.createObjectURL(file);
        element.download = "RSAKey.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
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
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error.response);
          });
    }
 
    render(){
        const {password} = this.state.password;
        return(
            <div className="container col-md-12">
                
                <div style={{"padding-left":"150px", "padding-top":"100px", "padding-bottom":"50px", "padding-right":"150px"}}>
                    <h3>After generating cryptographic keys, a file containing your private key will be downloaded. 
                        Please keep this file safe as it is required to access your data.
                        Please store this file in a removable flash drive.
                    </h3>
                </div>

                <div className="col-md-6 container"> 
                <div style={{"padding-left":"320px", "padding-top":"50px", "padding-bottom":"50px"}}><h3>Generate Keys</h3></div>
               
                <h6>Please Enter your password to generate keys</h6>
               
                <br/><br/>

                <input
                className="form-control"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                placeholder="Password"
                />

                <br/>

                <label htmlFor="exampleInputPassword1">Confirm Password</label>
                
                <input
                    className="form-control"
                    id="confPassword"
                    onChange={this.confirmPassword}
                    type="password"
                    placeholder="Confirm Password"
                />

                <br/><br/><br/>

                <div style={{"padding-left":"350px", "padding-bottom":"50px"}}>
                    <button className="btn btn-success" onClick={this.generate}>Generate Keys</button>
                </div>

                <div style={{"padding-left":"290px", "padding-bottom":"50px"}}>
                    <p className="text-success">{this.state.message}</p>
                </div>
            </div>    
            
            </div>
        )
    }
}

export default generateKeys;