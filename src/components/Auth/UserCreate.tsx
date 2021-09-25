import React, {Component} from "react"
import {  Typography, TextField, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom"
import { Form, Formik } from "formik"
import * as Yup from 'yup'


const Schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required."),
    password: Yup.string()
    .required("Password is required.")
    .min(6, "Password too short!")
    .max(25, "Password is too long!"),
  
})

interface Values {
    email: string,
    password: string
    // confirmPassword: string
}

type Props = {
    updateToken: (newToken: string) => void;
    
    // sessionToken: string;
};

type submitState = {
  registered: boolean
};

class UserCreate extends Component<Props, submitState> {
    constructor(props: Props){
        super(props)
        this.state = {
            registered: false
            
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(values: Values, props: Props) {
    
        fetch("http://localhost:3000/auth/register", {
            method: 'POST',
            body: JSON.stringify({user:{email: values.email, password: values.password, role: "user"}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
            ).then((data) => {
                if(!data.error){
                window.localStorage.setItem('token', data.sessionToken)
                this.props.updateToken(data.sessionToken);
                this.setState( { registered: true })
                console.log("USER Created!", data)
                } else {
                    alert(`${data}.error.errors[0].message`)
                }


            })
            .catch((err) => console.log(err))
    } 


    render() {
        return (
        <div>
            {( this.state.registered === true ) ? <Redirect to= '/' /> : null}
            <Typography>Sign Up</Typography>
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
          
                {/* <div>
                    <TextField
                    name=" confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                     {errors.confirmPassword && touched.confirmPassword ? (
                    <div>{errors.confirmPassword}</div>
                ) : null }
                </div> */}

                <Button type="submit">Submit</Button>
                <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>)}


</Formik>
</div>
      
        )
    }
}






export default UserCreate