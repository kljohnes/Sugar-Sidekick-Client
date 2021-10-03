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
        <div className = "login">
            {this.state.loginForm ? (
                <div>
                    <UserCreate updateToken={this.props.updateToken}/>

                </div>
       
        ): (
            <div>
                <UserLogin 
                updateToken={this.props.updateToken} updateRole={this.props.updateRole}/>
                </div>
        )}
{/* Originally this button would toggle between login and signup. Removed this ability and instead including a button to contact admin for an account. */}
        {/* <Button className="signUp" onClick ={(event) => {this.toggler(event)}}> {this.state.loginForm ? "Have an account? Log In." : "No account? Sign Up."}</Button> */}
        {<Button className="signup" href="/Contact">No account? Request access.</Button>}
</div>
    )
}

}

export default Auth