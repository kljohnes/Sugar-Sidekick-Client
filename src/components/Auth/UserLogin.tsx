import React, { Component } from "react"
import { TextField, Typography, Button } from "@material-ui/core";
import { Form, Formik, validateYupSchema } from "formik"
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
    updateToken: (newToken: string) => void
    // updateRole: {role: string} => void
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
            role: "user"            
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
                    this.props.updateToken(data.sessionToken);
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
        <div>
        {( this.state.loggedIn === true && this.state.role === "admin" ) ? <Redirect to= '/AdminHome' /> : null}
        <Typography>Log In</Typography>
            <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={Schema}
            onSubmit={(values)=> {
                this.handleSubmit(values, this.props)}}>
            {({ values, handleChange, handleBlur, errors, touched  }) => (
            <Form>
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
                <div>
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

                <Button type="submit">Submit</Button>
                <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>)}


</Formik>
</div>
      
        )
    }
}

export default UserLogin