import React, { Component } from "react";
import Qrimage from './qrimage'
import { Link } from 'react-router-dom';

class Signup extends Component {
  state = {
      firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: 0,
        address: {
            line1: "",
            line2: "",
            city: "",
            state: "",
            pincode: 0
        },
    confPassword: "",
    existingEmail: false,
    existingEmailMessage: "",
    validEmail: true,
    emailError: "",
    validName: true,
    nameError: "",
    matchPassword: true,
    passwordError: "",
    validPhone: true,
    phoneError: "",
    validPincode: true,
    pincodeError: "",
    showPopup: false,
    qrimage: "",
    passErrorSmall: true,
    passErrorCapital: true,
    passErrorNumber: true,
    passLength: true
  };

  sendData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      console.log(JSON.stringify(data));
      const responseJson = await response.json();
      console.log(responseJson);
      this.setState({showPopup: true, qrimage: responseJson[1].qrimage})
      this.handleQR(responseJson[1].qrimage)
      // return responseJson.success;

    } catch (error) {
      console.error(error);
    }
  };

  componentDidUpdate(){
    if(this.qrimage){
      this.setState({showPopup: true})
    }
    // console.log(this.state.showPopup)
  }

  componentDidMount(){
    if(this.qrimage){
      this.setState({showPopup: true})
    }
    console.log(this.state.showPopup)
  }  

  handleQR = qr => {
    // this.props.history.push(`/qr/`+this.state.qrimage)
  }

  handleSubmit = e => {
    e.preventDefault();
    var data={email:this.state.email, password:this.state.password, firstName:this.state.firstName, lastName: this.state.lastName, phone: this.state.phone, address:this.state.address}
    if(this.state.validEmail && this.state.matchPassword){
      this.sendData("/auth/registerUser", data);
    }
    
  };

  handleChange = e => {
    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
      }
    );
  };

  handleEmail = e => {                                                            //checking if email is in correct format
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

  handlePassword = e => {
    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
      }
    );
    this.componentDidUpdate()
    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
      }
    );
    var str = e.target.value
    console.log(e.target.value)
    // if (str.match(/[a-z]/g)){
    //   this.setState({passErrorSmall: false})
    // }else{
    //   this.setState({passErrorSmall: true})
    // }
    if (str.match(/[A-Z]/g)){
      this.setState({passErrorCapital: false})
    }else{
      this.setState({passErrorCapital: true})
    }
    if (str.match(/[0-9]/g)){
      this.setState({passErrorNumber: false})
    }else{
      this.setState({passErrorNumber: true})
    }
    if (str.match(/[^a-zA-Z\d]/g)){
      this.setState({passErrorSmall: false})
    }else{
      this.setState({passErrorSmall: true})
    }
    if (str.length >= 8){
      this.setState({passLength: false})
    }else{
      this.setState({passLength: true})
    }
    if (str.length >= 2){
      this.setState({passErrorSmall: false})
    }else{
      this.setState({passErrorSmall: true})
    }

  };

  confirmPassword = e => {                                                       //checking if passwords match
      this.handleChange(e)
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

  handleName = e => {                                                           //checking validity of name
    this.handleChange(e);
    if (e.target.value.match(/^[A-Za-z\d_]*$/)) {
      this.setState({
        validName: true,
        nameError: ""
      });
    } else {
        this.setState({
            validName: false,
            nameError: "Please enter a valid name"
        });
    }
  };

  handlePhone = e => {                                                            //checking validity of phone number
    this.handleChange(e); 
    if (isNaN(e.target.value) || Number(e.target.value) < 0 || Number(e.target.value) < 1000000000 || Number(e.target.value) > 9999999999) {
      this.setState({
        validPhone: false,
        phoneError: "Please enter a valid phone number"
      });
    } else {
      this.setState({
        validPhone: true,
        phoneError: ""
      });
    }
  };

  handlePincode = e => {                                                          //checking validity of phone number
    this.setState({
      address: { ...this.state.address, [e.target.id]: e.target.value }
    });
    if (isNaN(e.target.value) || Number(e.target.value) < 0 || Number(e.target.value) < 100000 || Number(e.target.value) > 999999) {
      this.setState({
        validPincode: false,
        pincodeError: "Please enter a valid pincode"
      });
    } else {
      this.setState({
        validPincode: true,
        pincodeError: ""
      });
    }
  };

  handleChangeAddress = e => {
    this.setState({
        address: { ...this.state.address, [e.target.id]: e.target.value }
      });
  };


  render() {
    return (
      <section>
        <div>
          <div className="signup-content container col-md-5 center">
            <div className="signup-form">
            <h3 className="center" style={{"padding-top":"80px","padding-bottom":"30px", "padding-left":"290px"}}>Signup</h3>
              <form className="form-group center">

                    <p className="text-danger">{this.state.existingEmailMessage}</p>

                    <label htmlFor="exampleInputEmail1">First Name</label>
                    <input
                        className="form-control"
                        id="firstName"
                        onChange={this.handleName}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="First Name"
                    />

                    <label htmlFor="exampleInputEmail1">Last Name</label>
                    <input
                        className="form-control"
                        id="lastName"
                        onChange={this.handleName}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="Last Name"
                    />

                    <p className="text-danger">{this.state.nameError}</p>
                    
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
                        onChange={this.handlePassword}
                        type="password"
                        placeholder="Password"
                    />

                    {this.state.passErrorSmall && (<p className="text-danger">Must contain a small letter</p>)}
                    {!this.state.passErrorSmall && (<p className="text-success">Must contain a small letter</p>)}
                    {this.state.passErrorCapital && (<p className="text-danger">Must contain a capital letter</p>)}
                    {!this.state.passErrorCapital && (<p className="text-success">Must contain a capital letter</p>)}
                    {this.state.passErrorNumber && (<p className="text-danger">Must contain a number</p>)}
                    {!this.state.passErrorNumber && (<p className="text-success">Must contain a number</p>)}
                    {this.state.passLength && (<p className="text-danger">Length must be atleast 8</p>)}
                    {!this.state.passLength && (<p className="text-success">Length must be atleast 8</p>)}

                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input
                        className="form-control"
                        id="confPassword"
                        onChange={this.confirmPassword}
                        type="password"
                        placeholder="Password"
                    />

                    <p className="text-danger">{this.state.passwordError}</p>

                    <h5>Address</h5>

                    <label htmlFor="exampleInputEmail1">Line 1</label>
                    <input
                        className="form-control"
                        id="line1"
                        onChange={this.handleChangeAddress}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="Line 1"
                    />

                    <label htmlFor="exampleInputEmail1">Line 2</label>
                    <input
                        className="form-control"
                        id="line2"
                        onChange={this.handleChangeAddress}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="Line 2"
                    />

                    <label htmlFor="exampleInputEmail1">City</label>
                    <input
                        className="form-control"
                        id="city"
                        onChange={this.handleChangeAddress}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="City"
                    />

                    <label htmlFor="exampleInputEmail1">State</label>
                    <input
                        className="form-control"
                        id="state"
                        onChange={this.handleChangeAddress}
                        type="text"
                        aria-describedby="emailHelp"
                        placeholder="State"
                    />

                    <label htmlFor="exampleInputEmail1">Pincode</label>
                    <input
                        className="form-control"
                        id="pincode"
                        onChange={this.handlePincode}
                        type="number"
                        aria-describedby="emailHelp"
                        placeholder="Pincode"
                    />

                    <p className="text-danger">{this.state.pincodeError}</p>

                    <label htmlFor="exampleInputEmail1">Phone</label>
                    <input
                        className="form-control"
                        id="phone"
                        onChange={this.handlePhone}
                        type="number"
                        aria-describedby="emailHelp"
                        placeholder="Phone"
                    />

                    <p className="text-danger">{this.state.phoneError}</p>
                </form>
                <div style={{"padding-left":"340px", "padding-top":"30px"}}><button className="btn btn-success" onClick={this.handleSubmit}>Register</button></div> 
                <br/><br/>
                <div style={{"padding-left":"240px", "padding-top":"10px"}}><Link to='/login'>Already have an account? Login now!</Link> </div>
                <br/><br/><br/><br/>
            </div>
          </div>
        </div>
        <div> {this.state.showPopup ?  <Qrimage qrimage={this.state.qrimage} email={this.state.email} /> : null}  </div>
        {/* <Qrimage qrimage={this.state.qrimage} email={this.state.email} /> */}
      </section>
    );
  }
}

export default Signup;