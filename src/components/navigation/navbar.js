import React,{Component} from 'react'
import { Link, NavLink } from 'react-router-dom'


function updateNavbar(){
    if(localStorage.getItem('token') != null){
        this.setState({auth : true}); 
    }
    else{
        this.setState({auth : false});
    }
}

export class Navbar extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            auth : false,
            update : updateNavbar.bind(this),
        };
    }

    componentDidMount(){
        if(localStorage.getItem('token') != null){
            this.setState({auth : true}); 
        }
        else{
            this.setState({auth : false});
        }
    }

    componentDidUpdate(){
        if(localStorage.getItem('token') != null){
            if(!this.state.auth)
            this.setState({auth : true}); 
        }
        else{
            if(this.state.auth){
                this.setState({auth : false});
            }
        }
    }

    logout(){
        localStorage.clear()
    }

    render(){
        console.log("Nav: " + this.state.update)
        return(
            <div className="navbar navbar-expand-lg navbar-dark bg-success">
                <Link to='/' className="navbar-brand" style={{ "fontSize":"2.2em" }}>DVault</Link>
                
            <div className="collapse navbar-collapse container">
                { this.state.auth && (
                <div>
                <ul className="navbar-nav mr-auto float-left">
                    <li className="nav-item active"><NavLink to='/upload'><div className="float-left"><button type="button" className="btn btn-success btn-lg right" style={{ "fontSize":"1.8em","width":"175px","margin-left":"100px" }}>Upload</button></div></NavLink></li>
                    {/* <li className="nav-item active"><NavLink to='/store/2'><div className="float-left"><button type="button" className="btn btn-primary right" style={{ "fontSize":"1.8em","width":"180px" }}>Merch Store</button></div></NavLink></li>
                    <li className="nav-item active"><NavLink to='/library'><div className="float-left"><button type="button" className="btn btn-primary right" style={{ "fontSize":"1.8em","width":"120px" }}>Library</button></div></NavLink></li>
                    <li className="nav-item active"><NavLink to='/friends'><div className="float-right"><button type="button" className="btn btn-primary right" style={{ "fontSize":"1.8em","width":"120px" }}>Friends</button></div></NavLink></li> */}
                {/* </ul>
                <ul className="navbar-nav mr-auto float-right"> */}
                    {/* <li className="nav-item active"><NavLink to='/profile'><div className="float-right"><button type="button" className="btn btn-success right" style={{ "fontSize":"1.8em","width":"120px" }}>Profile</button></div></NavLink></li> */}
                
                    <li className="nav-item active float-right">
                        
                            <NavLink to='/'>
                                <div className="float-right">
                                <button type="button" className="btn btn-success right" style={{ "fontSize":"1.8em","width":"180px", "margin-left":"1000px", "color":"white" }} onClick={this.logout}>Logout</button>
                                </div>
                            </NavLink>
                            
                        </li>
                </ul>
                
                
                </div>
                )}
                
            </div>

            <div className="float-right container"> 
                { !this.state.auth && (
                <div className="container">
                <ul className="navbar-nav float-right">
                    <li className="nav-item active float-right"><NavLink to={{pathname: '/login', aboutProps:{update: this.state.update} }}><button className="btn btn-success btn-lg right" style={{"font-size":"1.8em", "margin-left":"100px"}} >Login</button></NavLink></li>
                    <li className="nav-item active float-right"><NavLink to='/signup'><button className="btn btn-success right" style={{"font-size":"1.8em", "margin-left":"100px"}} >Signup</button></NavLink></li>
                </ul>
                </div>
                )}
            </div>   
            </div>
        )
    }
}