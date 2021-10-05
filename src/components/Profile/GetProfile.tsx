import React, { Component } from 'react'
import APIURL from '../../helpers/environment'
import {Redirect} from "react-router-dom"

type AcceptedProps = {
    token: string
}

type ProfileState = {
    profile: {
        first_name: string,
        diaversary: string,
        location: string
    },
    existingProfile: boolean

}

export default class GetProfile extends Component <AcceptedProps, ProfileState> {
    constructor(props: AcceptedProps) {
    super(props)
    this.state = {
        profile: {
            first_name: '',
            diaversary: '',
            location: ''
        },
        existingProfile: true
    }
}

componentDidMount(){
    this.fetchProfile()
}

fetchProfile = ():void => {
    fetch(`${APIURL}/profile/mine`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.token}`
        })
    }).then(response => response.json())
      .then(profileData => {
          console.log(profileData)
          if (profileData !== null) {
          this.setState({
             existingProfile: true,
             profile: { first_name: profileData.first_name,
              diaversary: profileData.diaversary,
              location: profileData.location,}
        })
    } else {
        this.setState({ existingProfile: false })
    }
    }).catch(err => console.log(err))
}
    render() {
        return (
            <div style={{display: "grid", justifyContent: "center"}}>
                {(this.state.existingProfile === false) ? <Redirect to ="/Profile"/> : null}
                <div style={{border: "1px solid white", borderRadius: "5px", marginTop: "20%", padding: "15px"}}>
                <h1>My Profile:</h1>
                <p>First Name: {this.state.profile.first_name}</p>
                <p>Diaversary: {this.state.profile.diaversary}</p>
                <p>Location: {this.state.profile.location}</p>
                </div>
            </div>
        )
    }
}
