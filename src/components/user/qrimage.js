import React, { Component } from 'react'
import axios from "axios";
import { Redirect } from 'react-router-dom'
import '../../styles/popup.css'

class qrimage extends Component{
    state={
        otp: 0,
        registerSuccess: false
    }

    handleChange = e => {
        this.setState(
          {
            [e.target.id]: e.target.value
          },
          () => {
          }
        );
    };

    getData = () => {
        const url = "/auth/verifyOtp"
        console.log("in getData")
        axios
          .post(url, {email:this.props.email, otp:this.state.otp})
          .then((response) => {
            console.log(response.data.token);
            localStorage.setItem('token', response.data.token)
            this.validateUser()
            // this.setState({registerSuccess:true})
            // this.props.history.push(`/login`)
            // self.completeLogin(response);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      componentDidMount(){
        if(this.props.qrimage){
        }
      }

      validateUser = () => {
        const url = "/auth/validateUser"
        axios
          .post(url, {email:this.props.email})
          .then((response) => {
            console.log(response);
            this.setState({registerSuccess:true})
            // localStorage.setItem('token', response.data.token)
            // this.validateUser()
            // this.setState({registerSuccess:true})
            // this.props.history.push(`/login`)
            // self.completeLogin(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }

    render(){
        if(this.state.registerSuccess){
            return <Redirect to='/setup/generateKeys' />
          }
        console.log(this.props.qrimage)
        return(
            <div className="popup ">
                {this.props.qrimage != "" && (
                    <div className="popup\_inner container" style={{"background":"white", "margin-top":"300px", "padding-top":"50px"}}>
                      <h3 style={{"background":"white"}}>Scan the QR code with your Google Authenticator App and confirm the OTP</h3>
                        <div className="container" style={{"padding-left":"450px"}}><img src={this.props.qrimage} alt="photo" /></div>
                        <br/><br/>
                        <div className="container" style={{"padding-left":"400px"}}>
                          <input
                            type="email"
                            name="otp"
                            id="otp"
                            placeholder="OTP"
                            onChange={this.handleChange}
                        /></div>
                        <br/><br/>
                        <div className="container" style={{"padding-left":"500px", "padding-bottom":"50px"}}><button className="btn btn-success" onClick={this.getData}>Verify</button></div>
                    </div>
                )}
            </div>
        )
    }
}

export default qrimage