import  React, { Component } from 'react';
import Auth from '../components/Auth/Auth'
import Button from '@mui/material/Button';
import '../App.css';



type AcceptedProps = {
 
    
}
class Home extends Component<AcceptedProps> {
    constructor(props: AcceptedProps){
        super(props);
    }

render() {
    return (
        <div id="home">
        <h1>Welcome To Sugar Sidekick</h1>
        <Button href='/auth'>Log In or Sign Up</Button>
        </div>
    )
}

}

export default Home