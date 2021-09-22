import  React, { Component } from 'react';
import Auth from '../components/Auth/Auth'
import Button from '@mui/material/Button';


type AcceptedProps = {
 
    
}
class Home extends Component<AcceptedProps> {
    constructor(props: AcceptedProps){
        super(props);
    }

render() {
    return (
        <div>
        <h1>You are on the home page</h1>
        <Button href='/auth'>Log In or Sign Up</Button>
        </div>
    )
}

}

export default Home