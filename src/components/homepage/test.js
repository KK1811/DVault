import React, { Component } from 'react'

class test extends Component {
    state={
        user:{
            name:"KK",
            email:"k@k.com",
            age:"22"
        }
    }

    store = () => { 
        // var RSAKey = JSON.parse(localStorage.getItem('RSAKey'))
        // console.log(RSAKey)
        localStorage.setItem('key', JSON.stringify(this.state.user))
        var key = JSON.parse(localStorage.getItem('key'))
        console.log(key)
        this.downloadFile(JSON.stringify(this.state.user))
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

    uploadFile = (e) => {
        this.fileUploader.click();
        console.log(e.target.result)
    }

    showFile = async (e) => {

        console.log(e.target.value)
        var file = e.target.value
        const filename = file.substring(12,)

        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
            // console.log(reader)
          const text = (e.target.result)
        //   console.log(e.target.value)
          this.setState({fileText: text})
          console.log(JSON.parse(this.state.fileText))
        //   alert(text)
        };
        reader.readAsText(e.target.files[0])
    }

    

    render(){
        return(
            <div>
                <button onClick={this.store}>Store</button>
                {/* <div className="add-media" onClick={console.log('Upload')}>
                    <i className="plus icon"></i>
                    <input type="file" id="file" ref="fileUploader"/>
                </div> */}

                <div style={{"padding-left":"450px", "padding-bottom":"50px", "padding-top":"50px"}}><input
                        type="file"
                        onChange={(e)=>{this.showFile(e)}}
                /> </div>
            </div>
            
        )
    }
}

export default test;