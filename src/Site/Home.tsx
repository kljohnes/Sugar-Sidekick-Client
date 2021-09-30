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
        <Container maxWidth="lg">
              <Typography variant='h1'>Welcome To Sugar Sidekick</Typography>
             <ul>
                <li>Log</li>
                <li>Prescription info</li>
                <li>Carb counts</li>
                    </ul>
          <img src={background} className="homeImg"/>
        </Container>
       
    )
}

}

export default Home