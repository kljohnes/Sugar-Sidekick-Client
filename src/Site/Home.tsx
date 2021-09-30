import  React, { Component } from 'react';
import Auth from '../components/Auth/Auth'
import Button from '@mui/material/Button';
import './Home.css';
import background from '../assets/background.jpg'
import { Grid, Typography } from '@material-ui/core'


type AcceptedProps = {
 
    
}
class Home extends Component<AcceptedProps> {
    constructor(props: AcceptedProps){
        super(props);
    }

render() {
    return (
        <div className="Home">
            <h1>Welcome To Sugar Sidekick</h1>
        </div>
        // <Grid container style={{display: "flex", justifyContent: "spaceBetween"}}>
        // <Grid item>
        // <Typography>Welcome To Sugar Sidekick</Typography>
        // </Grid>
        // <Grid item>
        // {/* <img className="homePhoto" src={background} alt="diabetes devices"></img> */}
        // </Grid>
        // </Grid>

    )
}

}

export default Home