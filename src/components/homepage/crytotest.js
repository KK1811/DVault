import React, { Component } from 'react'
import cryptico from 'cryptico'
import rsa from 'js-crypto-rsa';
import axios from "axios";
import { Link } from 'react-router-dom'

class upload extends Component {
    

    constructor(props){
        super(props)
        this.state = {
            fileText: "asdfghjkl",
            privateKey:{},
            publicKey:{}
    
        }
      }

    generateKeys = () => {
        rsa.generateKey(2048).then( (key) => {
            // now you get the JWK public and private keys
            const publicKey = key.publicKey;
            const privateKey = key.privateKey;

            var privateKeyString = JSON.stringify(privateKey)
            var privateKeyJSON = JSON.parse(privateKeyString)
            this.setState({privateKey: privateKey, publicKey: publicKey})
            console.log(publicKey)
            console.log(privateKeyString)
            console.log(privateKeyJSON)
          })
    }  

    encryption = () => {
        const publicJwk = this.state.publicKey
        const privateJwk = this.state.privateKey
        const msg = "qwerty" // Uint8Array
 
        // sign
        rsa.encrypt(
          msg,
          publicJwk,
          'SHA-256', // optional, for OAEP. default is 'SHA-256'
          { // optional
            name: 'RSA-PSS', // default. 'RSASSA-PKCS1-v1_5' is also available.
            // label: new Uint8Array([...]) // optional
          }).then( (encrypted) => {
          // now you get an encrypted message in Uint8Array
            return rsa.decrypt(
              encrypted,
              privateJwk,
              'SHA-256', // optional, for OAEP. default is 'SHA-256'
              { // optional
                name: 'RSA-PSS', // default. 'RSASSA-PKCS1-v1_5' is also available.
                // label: new Uint8Array([...]) // optional
              }
            );  
        }).then( (decrypted) => {
          // now you get the decrypted message
        });
    }

    render(){
        return(
            <div>
                <button onClick={this.generateKeys}>Generate</button>
                <button onClick={this.encryption}>Encrypt</button>
            </div>
        )
    }


}

export default upload;