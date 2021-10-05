import React, { Component } from 'react'
import { Typography } from "@material-ui/core"

export default class About extends Component {
    render() {
        return (
            <div style={{textAlign: "center", marginLeft: "10%", marginRight: "10%", marginTop: "10%"}}>
                <Typography variant="h3"> About Sugar Sidekick</Typography>
                    <Typography> This is an app designed to make the management of diabetes just a little bit easier. On this site, you can log blood sugars, carbs, and insulin doses, keep track of prescriptions, and get carb counts for various foods. At this time, you must request access using the contact form. At that point, the admin will create an account for you. 
                    <br></br>
                    To preview the features of this website, you can log in with the following credentials:
                    <br></br>
                        email: user@email.com
                    <br></br>
                        password: password
                    <br></br>
                    This site is still under development and was built as an educational project for Eleven Fifty Academy's Web Development Course. Please avoid entering full names or other sensitive information as security cannot be guaranteed.
                </Typography>
        
            </div>
        )
    }
}
