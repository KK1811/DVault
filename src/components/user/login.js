import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Recaptcha from 'react-recaptcha'
import '../../styles/popup.css'

class BuyerLogin extends Component{
      constructor(props){
        super(props)
        this.state = {
          email: "",
          password: "",
          validEmail: true,
          emailError: "",
          invalidUser: false,
          invalidUserMessage: "",
          userValid: false,
          otp: 0,
          captchaVerified: false
        }
      }
    
      getData = () => {
        const url = "/auth/userLogin"
        axios                                                          
          .post(url, {
            email: this.state.email,
            password: this.state.password
          })
          .then((response) => {
            console.log(response)
            if(response.data.validated == true){
              this.setState({userValid: true})
            }
            this.completeLogin(response);
          })
          .catch((error) => {
            // this.errorLogin(error);
            console.log(error.response)
          });
      };

      errorLogin = e => {                                               //checking for invalid user
        this.setState({
            invalidUser: true,
            invalidUserMessage: e
          });
      };

      completeLogin = response => {                                     //completing Login process and storing token
        if (response.status === 200) {
          console.log(response)
          // localStorage.setItem('token',response.data[1].token)
          // this.props.history.push(`/buyer/subscriptions`) 
          // this.props.location.aboutProps.update();
        }
      };

      handleLogin = e => {
        if(this.state.validEmail && !this.state.invalidUser){
          this.getData()
        }
      };

      handleChange = e => {                                               //changing state according to the change in input fields
        this.setState({
            [e.target.id]: e.target.value
          });
      };


      handleEmail = e => {                                                 //checking if email is in correct format
        this.handleChange(e);
        if (
          e.target.value.match(
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
          )
        ) {
          if (!this.state.validEmail) {
            this.setState({
              validEmail: true,
              emailError: ""
            });
          }
        } else {
          if (this.state.validEmail) {
            this.setState({
              validEmail: false,
              emailError: "Please enter a valid email"
            });
          }
        }
      };

      // verifyCallback(response) {
      //   if (response) {
      //     this.setState({
      //       captchaVerified: true
      //     })
      //   }
      // }

      // recaptchaLoaded() {
      //   console.log('capcha successfully loaded');
      // }


      verifyOtp = () => {
        const url = "/auth/verifyOtp"
        console.log("in getData")
        axios
          .post(url, {email:this.state.email, otp:this.state.otp})
          .then((response) => {
            console.log(response.data);
            localStorage.setItem('token', response.data.token)
            // this.validateUser()
            // this.setState({registerSuccess:true})
            this.props.history.push(`/upload`)
            // self.completeLogin(response);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      render(){
          return(
            <div>
              <div className="col-md-4 center container">
                <h3 className="center" style={{"padding-top":"80px","padding-bottom":"30px", "padding-left":"280px"}}>Login</h3>
                  <form className="form-group center">

                    <p className="text-danger">{this.state.invalidUserMessage.toString()}</p>

                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                      className="form-control"
                      id="email"
                      onChange={this.handleEmail}
                      type="email"
                      aria-describedby="emailHelp"
                      placeholder="Email"
                    />

                    <p className="text-danger">{this.state.emailError}</p>
                    
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      className="form-control"
                      id="password"
                      onChange={this.handleChange}
                      type="password"
                      placeholder="Password"
                    />
                    
                  </form>
                  
                  <div className="container center" style={{"padding-left":"280px", "padding-top":"50px"}}><button className="btn btn-success center" onClick={this.getData}>Login</button></div>  

                  {/* <Recaptcha
                    sitekey="6LeFUrYZAAAAADNlFBBeQs8jmNFkgfyx3palDZvJ"
                    render="explicit"
                    onloadCallback={this.recaptchaLoaded}
                    verifyCallback={this.verifyCallback}
                  /> */}

                  {/* <Recaptcha
                  sitekey="6LeFUrYZAAAAADNlFBBeQs8jmNFkgfyx3palDZvJ"
                  render="explicit"
                  onloadCallback={this.recaptchaLoaded}
                  verifyCallback={this.verifyCallback}
                />
                   */}
                  <br/><br/>

                  {this.state.userValid && (<div className="popup"><div className="popup\_internal container col-md-5" style={{"padding":"100px", "margin-top":"380px","margin-left":"500px", "margin-right":"480px", "background":"white"}}><input classname="form-control container" style={{"margin-left":"160px"}} placeholder="OTP" id="otp" onChange={this.handleChange}></input><br/><br/><button style={{"margin-left":"230px"}} className="btn btn-success" onClick={this.verifyOtp}>Verify OTP</button></div></div>)}
                  
                  <div style={{"padding-left":"180px"}}><Link to='/signup'>Don't have an account? Register now!</Link></div>
              </div>
            </div>
          )
      }
}

export default BuyerLogin