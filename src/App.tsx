import React, { Component } from 'react';
import './App.css';
import Nav from './Site/Nav';
import Home from './Site/Home'
import LogIndex from './components/Log/LogIndex'
import { Route, Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Footer from './Site/Footer'
import Auth from './components/Auth/Auth'
import ScriptIndex from './components/Prescriptions/ScriptIndex'
import AdminHome from './components/Admin/AdminHome'
import Carbs from './components/CarbCount/Carbs'
import Formspree from './components/formspree'
import Profile from './components/Profile/Profile'
import GetProfile from './components/Profile/GetProfile'
import About from "./Site/About"


type AppState = {
  token: string
  role: string,

}
class App extends Component< {}, AppState>{
  constructor(props: {}) {
    super(props);
    this.state = {
      token: '',
      role: ''
    }
    // this.protectedViews = this.protectedViews.bind(this)

  }

  componentDidMount() {
    if(localStorage.getItem('token')){
      this.setState({
        token: localStorage.getItem('token')!,
      })
    }
    if(localStorage.getItem('role')){
      this.setState({
        role: localStorage.getItem('role')!
      })
    }
    console.log("Component Did Mount")
    console.log(this.state.token)
  }

  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({
      token: newToken
    });
    console.log(this.state.token)
  };

  updateRole = (newRole: string) => {
    // if (newRole !== null) {
    localStorage.setItem("role", newRole)
    this.setState({role: newRole})
   
  // } else {
  //   this.setState({role: "user"})
  //   localStorage.setItem("role", "user")
  // }
} 
protectedViews = () => {
    return this.state.token === localStorage.getItem("token") ? (
    <Home token={this.state.token}/> ): ( 
    <Auth 
      updateToken={this.updateToken}
      updateRole={this.updateRole}/>
    )}
    
profileView = () => {
      return this.state.token === localStorage.getItem("token") ? (
      <GetProfile token={this.state.token}/> ): ( 
      <Auth 
        updateToken={this.updateToken}
        updateRole={this.updateRole}/>
      )}

logView = () => {
        return this.state.token === localStorage.getItem("token") ? (
        <LogIndex token={this.state.token}/> ): ( 
        <Auth 
          updateToken={this.updateToken}
          updateRole={this.updateRole}/>
        )}
prescriptionView = () => {
          return this.state.token === localStorage.getItem("token") ? (
          <ScriptIndex token={this.state.token}/> ): ( 
          <Auth 
            updateToken={this.updateToken}
            updateRole={this.updateRole}/>
          )}
        
adminViews = () => {
      return this.state.token === localStorage.getItem("token") && 
      this.state.role === "admin" ? (
      <AdminHome token={this.state.token}/> ): ( 
        <Auth 
        updateToken={this.updateToken}
        updateRole={this.updateRole}
      />)}

   
clearToken = () => {
    localStorage.clear();
    this.setState({token: ""})
    window.location.href='/Auth'

  }
render() {
    return (
      <div className="app">
     <Router>
     
        <Nav 
          updateToken={this.updateToken} 
          clearToken={this.clearToken}
          updateRole={this.updateRole}
          />
      <Switch>
        <Route exact path = '/'>{this.protectedViews}</Route>
        <Route exact path ='/Auth'><Auth updateToken={this.updateToken} updateRole={this.updateRole}/></Route>
        <Route exact path='/CarbCount'><Carbs/></Route>
        <Route exact path='/About'><About/></Route>
        <Route exact path='/Profile'>{this.profileView}</Route>
        <Route exact path='/GetProfile'>{this.profileView}</Route>
        <Route exact path='/LogIndex'>{this.logView}</Route>
        <Route exact path='/ScriptIndex'>{this.prescriptionView}</Route>
        <Route exact path ='/Contact'><Formspree /></Route>
        <Route exact path='/AdminHome'>{this.adminViews}</Route>
        </Switch>
      </Router>
      <Footer/>
      </div>
  );
  }
}
export default App;
