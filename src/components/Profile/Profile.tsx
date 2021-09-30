import React, { Component } from 'react'
import { TextField, Button } from "@material-ui/core"

type ProfileProps = {
    // fetchProfile: () => void
    token: string
}

type ProfileState = {
    first_name: string,
    diaversary: string
    location: string
}

class ProfileCreate extends Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps){
        super(props)
        this.state = {
            first_name: '',
            diaversary: '',
            location: '',
        }
    }

    ProfileCreate = (e: React.FormEvent<HTMLFormElement>):void => {
        let token = localStorage.getItem('token')
        e.preventDefault();
    
        fetch("http://localhost:3000/profile/", {
            method: 'POST',
            body: JSON.stringify({
                profile:{
                first_name: this.state.first_name, 
                diaversary: this.state.diaversary,
                location: this.state.location,
            }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            })
        }).then(response => response.json())
          .then(profileData => {
              console.log(profileData)
              this.setState({
                  first_name: '',
                  diaversary: '',
                  location: '',
            })
            // this.props.fetchProfile()
          })}
    


    handleChangeName = (e: any ) => { this.setState({
        first_name: e.target.value
    })}
    
    handleChangeDiaversary = (e: any) => { this.setState({
           diaversary: e.target.value
    })}
    
    handleChangeLocation = (e: any) => { this.setState({
        location: e.target.value
    })}
    
    render() {
        return (
            <div>
                <h1>Create Your Profile</h1>
                <form onSubmit={this.ProfileCreate} >
               
                        <div>
                            <TextField
                                label="first_name"
                                type="text"
                                name="first_name"
                                onChange={this.handleChangeName} />
                        </div>
                        <div>
                            <TextField
                                label="diaversary"
                                type="text"
                                name="diaversary"
                                onChange={this.handleChangeDiaversary}/>
                        </div>
                        <div>
                            <p>Location</p>
                            <TextField
                                name="location"
                                type="text"
                                label="location"
                                onChange={this.handleChangeLocation}/>
                        </div>
                        <Button type="submit">SUBMIT</Button>
             
                </form>
            </div>

        )
    }
}

export default ProfileCreate