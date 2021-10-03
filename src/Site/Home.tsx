import  React, { Component } from 'react';
import Auth from '../components/Auth/Auth'
import Button from '@mui/material/Button';
import './Home.css';
import background from '../assets/background.jpg'
import { Grid, Typography, Container} from '@material-ui/core'
import APIURL from '../helpers/environment'


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
            <div className="homeText">
            {this.state.first_name ? 
            <h5>Hi, {this.state.first_name}!</h5>: null }
              <h1>Welcome To Sugar Sidekick</h1>
              </div>
              <div>
              <Button className="button" href="/About">About</Button>
              </div>
           </div>
    )
}

}

export default Home