import React, { Component } from 'react';
import './App.css';
import Nav from './Site/Nav';
import Log from './components/Log/Log'
import Home from './Site/Home'
import UserCreate from './components/Auth/UserCreate'
import UserLogin from './components/Auth/UserLogin'
import { Route, Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Footer from './Site/Footer'
import Auth from './components/Auth/Auth'
import LogCreate from './components/Log/LogCreate'

type AppState = {
  sessionToken: string | null;
  authenticated: boolean
}


let sessionToken = localStorage.getItem("token")
let validate = sessionToken ? true : false;

class App extends Component<{}, AppState>{
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionToken: sessionToken,
      authenticated: validate
    }

  }
  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken
    });
  };




  protectedViews = () => {
    return this.state.sessionToken === localStorage.getItem("token") && this.state.sessionToken != null ? <Route exact path='/Log'><Log sessionToken={this.state.sessionToken}/></Route> : ( <Route exact path= '/Auth'><Auth updateToken={this.updateToken}/></Route>)}
    


  clearToken = () => {
    localStorage.clear();
    this.setState({sessionToken: ""})
  }


  render() {
    return (
      <div>
     
        
         <Router>
     
        <Nav sessionToken={this.state.sessionToken} clearToken={this.clearToken}/>
        <Route exact path = '/'><Home/></Route>
        {this.protectedViews()}
       {/* <Route exact path = "/auth"><Auth updateToken={this.updateToken}/></Route> */}
        
      </Router>
      <LogCreate />
      </div>



    );
  }
}
export default App;
