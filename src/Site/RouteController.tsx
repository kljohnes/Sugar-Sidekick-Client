import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import Home from './Home'
import Auth from '../components/Auth/Auth'
import Log from '../components/Log/LogTable'
import { VoidExpression } from "typescript"

// type routeControllerState = {


// }

// type routeControllerProps = {
//     updateToken: (token:string) => VoidExpression
//     sessionToken: string

// }

// class routeController extends Component<routeControllerProps, routeControllerState>{
//     render(){
//         return (
//             <div>
//                 <Switch>
//                     <Route exact path ='/'><Home /></Route>
//                     {/* <Route exact path ='/log'><Log /></Route> */}
//                     <Route exact path ='/auth'><Auth updateToken = {this.props.updateToken} /></Route>
//                 </Switch>
//             </div>
//         )
//     }
// }