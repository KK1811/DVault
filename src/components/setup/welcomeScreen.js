import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class welcomeScreen extends Component {
    render(){
        return(
            <div>
                <p>Generate keys.</p>
                <button><Link to={'/setup/generatekeys'}>Lets Go!</Link></button>
            </div>
        )
    }
}

export default welcomeScreen;