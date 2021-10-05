import React, { Component } from "react"
import { TextField, Typography, Button } from "@material-ui/core";
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import { Redirect } from 'react-router-dom'
import APIURL from '../../helpers/environment'


const Schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email Required"),
    password: Yup.string()
    .required("Password required")
    .min(6, "Password too short!")
    .max(25, "Password is too long!")
})

interface Values {
    email: string,
    password: string
}

type Props = {
    updateToken: (newToken: string) => void,
    updateRole: (role: string) => void
    // sessionToken: string;
};

type submitState = {
  loggedIn: boolean,
  role: string
};

class UserLogin extends Component<Props, submitState> {
    constructor(props: Props){
        super(props)
        this.state = {
            loggedIn: false,
            role: ''           
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(values: Values, props: Props) {
    
        fetch(`${APIURL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({user:{email: values.email, password: values.password, role: "user"}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
            ).then((data) => {
                if(data.message === "User successfully logged in."){
                    // window.localStorage.setItem('token', data.sessionToken)
                    this.props.updateToken(data.sessionToken)
                    this.props.updateRole(data.user.role);
                    this.setState( { loggedIn: true })
                    console.log("Logged In!", data)
                    } else {
                        alert(data.message)
                    }
                })
            .catch((err) => console.log(err))
    } 
 render() {
        return (
        <div className="login">
        {( this.state.loggedIn === true) ? <Redirect to= '/'/> : null}
        <Typography variant="h4">Please Log In</Typography>
            <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={Schema}
            onSubmit={(values)=> {
                this.handleSubmit(values, this.props)}}>
            {({ values, handleChange, handleBlur, errors, touched  }) => (
          
                <Form >
                <div className="loginForm">
                <div>
                    <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                ) : null }
                </div> 
                <div className="password">
                    <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                     {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                ) : null }
                </div>

                <Button className="button" type="submit">Submit</Button>
            </div>
            </Form>)}
            


</Formik>
</div>
      
        )
    }
}

export default UserLogin