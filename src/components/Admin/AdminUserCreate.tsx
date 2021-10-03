import React, {Component} from "react"
import {  Typography, TextField, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom"
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import APIURL from '../../helpers/environment'
import "./Admin.css"


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
    fetchUsers: () => void

}
type submitState = {
  registered: boolean
};

class AdminUserCreate extends Component<Props, submitState> {
    constructor(props: Props){
        super(props)
        this.state = {
            registered: false
            
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(values: Values, props: Props) {
    
        fetch(`${APIURL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({user:{email: values.email, password: values.password, role: "user"}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
            ).then((data) => {
                if(data.message === "User successfully registered."){
                window.localStorage.setItem('token', data.sessionToken)
                this.setState( { registered: true })
                console.log("User Created!", data)
                } else {
                    console.log(data)
                    alert(`${data.message}`)
                }


            })
            .catch((err) => console.log(err))
            this.props.fetchUsers()
    } 


    render() {
        return (
        <div className = "createUser">
            <Typography>Create A New User</Typography>
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

                <Button className="button" id="adminButton" type="submit">Submit</Button>
            </Form>)}


</Formik>
</div>
      
        )
    }
}






export default AdminUserCreate