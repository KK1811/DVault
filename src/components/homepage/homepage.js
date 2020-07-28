import React,{Component} from 'react';
import vault from '../../assets/vault.png'
import { Navbar } from './navbar'

class LandingPage extends Component{
    render(){
        return(
            <div><Navbar />
                <section id="banner">
                    <div className="container" style={{"padding-top":"100px"}}>
                        <div className="row">
                            <div className="col-md-6">
                                <h1 style={{"margin-left":"180px", "font-size":"60px"}}>DVault</h1>
                                <h4 style={{"margin-left":"90px","margin-top":"30px"}}>Digital•Distributed•Death-Proof</h4>
                                <br/><br/>
                                <p style={{"fontSize":"30px"}}>Our goal is to securely store and and transfer your data, even after your death</p>
                            </div>
                            <div className="col-md-6">
                                <img src={vault} id="logo-image" alt="" style={{"margin-left":"200px", "margin-top":"50px"}} />
                            </div>
                        </div>    
                    </div>
                </section>
            </div>
        )
    }
}

export default LandingPage