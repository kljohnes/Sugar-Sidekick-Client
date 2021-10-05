import  React, { Component } from 'react';
import Auth from '../components/Auth/Auth'
import Button from '@mui/material/Button';
import './Home.css';
import APIURL from '../helpers/environment'
import "../App.css"

type AcceptedProps = {
    token: string
}

type HomeState = {
    first_name: string
}
class Home extends Component<AcceptedProps, HomeState> {
    constructor(props: AcceptedProps){
        super(props);
        this.state= {
            first_name: ''
        }
    }

    componentDidMount() {
        this.fetchProfile()
        console.log("mounted")
      }
    fetchProfile = ():void => {
        fetch(`${APIURL}/profile/mine`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            })
        }).then(response => response.json())
          .then(profileData => {
              console.log(profileData)
              if (profileData !== null) {
              this.setState({
                first_name: profileData.first_name
            })
          }
        }).catch(err => console.log(err))}
  
render() {
    return (
        <div className="Home">
            <div className="greetingText">
            {this.state.first_name ? 
            <h4>Hi, {this.state.first_name}!</h4>: null }
            <div className="homeText">
              <h1>Welcome To Sugar Sidekick</h1>
              </div>
              </div>
              <div>
              <Button className="button" id="button1" href="/About">About</Button>
              <Button className="button" id="button2" href="/Auth">Log In</Button>
              </div>
           </div>
    )
}

}

export default Home