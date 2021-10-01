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



type AppState = {
  token: string
  role: string
}



// let sessionToken = localStorage.getItem("token")

class App extends Component< {}, AppState>{
  constructor(props: {}) {
    super(props);
    this.state = {
      token: '',
      role: "user"
    }
    // this.protectedViews = this.protectedViews.bind(this)

  }

  componentDidMount() : void {
    if(localStorage.getItem('token')){
      this.setState({
        token: localStorage.getItem('token')!,
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
    if (newRole !== null) {
    this.setState({role: newRole})
    localStorage.setItem("role", newRole)
  } else {
    this.setState({role: "user"})
    localStorage.setItem("role", "user")
  }
} 

// protectedViews = () => {
//     return this.state.token === localStorage.getItem("token") ? (
//     <Route exact path='/'><Home/></Route> ): ( 
//     <Route exact path= '/Auth'>
//       <Auth 
//       updateToken={this.updateToken}
//       updateRole={this.updateRole}
//     /></Route>)}
    
adminViews = () => {
      return this.state.token === localStorage.getItem("token") && 
      this.state.role === "admin" ? (
      <Route exact path='./AdminHome'><AdminHome token={this.state.token}/></Route> ): ( 
      <Route exact path= '/Auth'>
        <Auth 
        updateToken={this.updateToken}
        updateRole={this.updateRole}
      /></Route>)}

   
clearToken = () => {
    localStorage.clear();
    this.setState({token: ""})
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
        <Route exact path='/CarbCount'><Carbs/></Route>
        <Route exact path ='/Auth'><Auth updateToken={this.updateToken} updateRole={this.updateRole}/></Route>
        <Route exact path = '/'><Home/></Route>
        {/* {this.protectedViews()} */}
        <Route exact path='/Profile'><Profile token={this.state.token}/></Route>
        <Route exact path='/LogIndex'><LogIndex token={this.state.token}/></Route>
        <Route exact path='/ScriptIndex'><ScriptIndex token={this.state.token}/></Route>
        <Route exact path ='/Contact'><Formspree /></Route>
        <Route exact path='/AdminHome'><AdminHome token={this.state.token}/></Route>
        {/* {this.adminViews()} */}
       {/* <Route exact path = "/auth"><Auth updateToken={this.updateToken}/></Route> */}
        </Switch>
      </Router>
   
      {/* // <LogCreate sessionToken={this.state.sessionToken} /> */}
      <Footer/>
      </div>
  );
  }
}
export default App;
