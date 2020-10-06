import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import welcome from './components/setup/welcomeScreen';
import generatekeys from './components/setup/generateKeys'
import login from './components/user/login'
import signup from './components/user/signup'
import qrimage from './components/user/qrimage'
import upload from './components/dashboard/upload'
// import { Navbar } from './components/navigation/navbar'
import homepage from './components/homepage/homepage'
import test from './components/homepage/test'
import download from './components/dashboard/download';
import decrypt from './components/dashboard/decrypt'
import cryptotest from './components/homepage/crytotest'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path='/' component={homepage} />
        <Route exact path='/setup/welcome' component={welcome} />
        <Route exact path='/setup/generatekeys' component={generatekeys} />
        <Route exact path='/login' component={login} />
        <Route exact path='/signup' component={signup} />
        <Route exact path='/qr/:id' component={qrimage} />
        <Route exact path='/upload' component={upload} />
        <Route exact path='/test' component={test} />
        <Route exact path='/ctest' component={cryptotest} />
        <Route exact path='/download' component={download} />
        <Route exact path='/decrypt' component={decrypt} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
