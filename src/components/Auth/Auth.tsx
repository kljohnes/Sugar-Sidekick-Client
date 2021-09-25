import React, { Component } from 'react'
import UserLogin from './UserLogin'
import UserCreate from './UserCreate'
import { Button } from "@material-ui/core"

type AcceptedProps = {
    updateToken: (newToken: string) => void,
    updateRole: (newRole: string) => void
}

type AuthState = {
    loginForm: boolean
}

class Auth extends Component<AcceptedProps, AuthState>{
    constructor(props:AcceptedProps){
        super(props);
        this.state = {
            loginForm: false
        };
    }

    toggler = (event: any) => {
        if (this.state.loginForm === false) {
            return this.setState({
                loginForm: true,
            })
        }
        if (this.state.loginForm === true) {
            return this.setState({
                loginForm: false,
            })
        }

    }

render() {
    return (
        <div>
            {this.state.loginForm ? (
                <div>
                    <UserCreate updateToken={this.props.updateToken}/>

                </div>
       
        ): (
            <div>
                <UserLogin 
                updateToken={this.props.updateToken}/>
                </div>
        )}

        <Button onClick ={(event) => {this.toggler(event)}}> {this.state.loginForm ? "Have an account? Log In." : "No account? Sign up."}</Button>
        
</div>
    )
}

}

export default Auth