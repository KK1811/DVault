import React,{Component} from 'react'
import { Link, NavLink } from 'react-router-dom'


export class Navbar extends Component{ 

    logout(){
        localStorage.clear()
    }

    render(){
        return(
            <div className="navbar navbar-expand-lg navbar-dark bg-success">
                <Link to='/' className="navbar-brand" style={{ "fontSize":"2.2em" }}>DVault</Link>
                
                <div className="collapse navbar-collapse container">
                
                    <div>
                        <ul className="navbar-nav mr-auto float-left">
                            <li className="nav-item active"><NavLink to='/upload'><div className="float-left"><button type="button" className="btn btn-success btn-lg right" style={{ "fontSize":"1.8em","width":"190px" }}>Upload Files</button></div></NavLink></li>
                            <li className="nav-item active"><NavLink to='/download'><div className="float-left"><button type="button" className="btn btn-success btn-lg right" style={{ "fontSize":"1.8em","width":"175px","margin-left":"50px" }}>My Files</button></div></NavLink></li>
                            <li className="nav-item active"><NavLink to='/deadman'><div className="float-left"><button type="button" className="btn btn-success btn-lg right" style={{ "fontSize":"1.8em","width":"175px","margin-left":"50px" }}>Transactions</button></div></NavLink></li>
                            <li className="nav-item active"><NavLink to='/proof'><div className="float-left"><button type="button" className="btn btn-success btn-lg right" style={{ "fontSize":"1.8em","width":"175px","margin-left":"50px" }}>Proofs</button></div></NavLink></li>
                            <li className="nav-item active float-right">
                                
                                <NavLink to='/'>
                                    <div className="float-right">
                                        <button type="button" className="btn btn-success right" style={{ "fontSize":"1.8em","width":"180px", "margin-left":"250px", "color":"white" }} onClick={this.logout}>Logout</button>
                                    </div>
                                </NavLink>
                                    
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}