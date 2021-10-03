import React, { Component } from 'react'
import { Typography } from "@material-ui/core"

export default class About extends Component {
    render() {
        return (
            <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "10%"}}>
                <Typography> Welcome to Sugar Sidekick! This is an app designed to make the management of diabetes just a little bit easier. On this site, you can log blood sugars, carbs, and insulin doses, keep track of prescriptions, and get carb counts for various foods. At this time, you must request access using the contact form. At that point, the admin will create an account for you. Please note that this website was built as a learning project and is still under development.
                </Typography>
        
            </div>
        )
    }
}
