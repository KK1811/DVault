import React,{Component} from 'react'
import { Link, NavLink } from 'react-router-dom'


export class Navbar extends Component{ 

    render(){
        return(
            <div className="navbar navbar-expand-lg navbar-dark bg-success">
                <Link to='/' className="navbar-brand" style={{ "fontSize":"2.2em" }}>DVault</Link>


            <div className="float-right container"> 
           
                <div className="container">
                <ul className="navbar-nav float-right">
                    <li className="nav-item active float-right"><NavLink to={{pathname: '/login'}}><button className="btn btn-success btn-lg right" style={{"font-size":"1.8em", "margin-left":"800px"}} >Login</button></NavLink></li>
                    <li className="nav-item active float-right"><NavLink to='/signup'><button className="btn btn-success right" style={{"font-size":"1.8em", "margin-left":"100px"}} >Signup</button></NavLink></li>
                </ul>
                </div>
             
            </div>   
            </div>
        )
    }
}