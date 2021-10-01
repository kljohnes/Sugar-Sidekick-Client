import  React, { Component } from 'react';
import Auth from '../components/Auth/Auth'
import Button from '@mui/material/Button';
import './Home.css';
import background from '../assets/background.jpg'
import { Grid, Typography, Container} from '@material-ui/core'


type AcceptedProps = {
 
    
}
class Home extends Component<AcceptedProps> {
    constructor(props: AcceptedProps){
        super(props);
    }

render() {
    return (
        <div className="Home">
            <div className="homeText">
              <h1>Welcome To Sugar Sidekick</h1>
          </div>
          {/* <img src={background} className="homeImg"/> */}
        </div>
       
    )
}

}

export default Home