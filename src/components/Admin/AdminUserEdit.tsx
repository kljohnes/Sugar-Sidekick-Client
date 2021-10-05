import React, { Component } from 'react'
import { Button,TextField, Radio, RadioGroup, FormControl, FormLabel, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"
import { Modal, ModalHeader , ModalBody, ModalFooter } from 'reactstrap'
import { FormControlLabel } from '@mui/material'
import APIURL from '../../helpers/environment'


type UserEditProps = {
    userToUpdate: { [key: string]: any}
    updateOff: () => void
    token: string
    fetchUsers: () => void
}

interface UserEditState {
    email: string
    role: string
    modal: boolean
    password: string
}

class UserEdit extends Component<UserEditProps, UserEditState> {
    constructor(props: UserEditProps) {
        super(props)
        this.state = {
            modal: true,
            email: this.props.userToUpdate.email,
            role: this.props.userToUpdate.role,
            password: this.props.userToUpdate.password
        }
    }

userUpdate = () => {
    let token = localStorage.getItem('token')
    fetch(`${APIURL}/auth/${this.props.userToUpdate.id}`, {
        method: "PUT",
        body: JSON.stringify({
            user: {
                email: this.state.email,
                role: this.state.role,
                password: this.state.password
            },
        }),
        headers: new Headers ({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.token}`,
        }),
    }).then(res => {
        console.log(res)
        this.props.updateOff()
        this.props.fetchUsers()
     
    })
}

handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement> ) => { this.setState({
    email: e.target.value
})}

handleChangeRole = (e: React.ChangeEvent<HTMLInputElement>) => { this.setState({
        role: e.target.value
})}

handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => { this.setState({
    password: e.target.value
})}

handleClose = () => {
    this.setState({ modal: false })
    this.props.updateOff()
}

render() {
    return (
        <div>
        <Dialog open={this.state.modal} onClose={this.handleClose}>
            <DialogTitle>
                Update a user.
            </DialogTitle>
            <DialogContent>
            <div>
                    <TextField
                        label="Email"
                        type="text"
                        name="email"
                        onChange={this.handleChangeEmail} />
                </div>
                <div>
                    <TextField
                        label="Password"
                        type="text"
                        name="password"
                        onChange={this.handleChangePassword} />
                </div>
                <div>
                <FormControl component="fieldset">
                <FormLabel component="legend">Role</FormLabel>

                <RadioGroup
                 aria-label="role"
                 name="radio-buttons-group" value={this.state.role} onChange={this.handleChangeRole}>
                <FormControlLabel value="user" control={<Radio />} label="User" />
                <FormControlLabel value="admin" control={<Radio />} label="Admin"></FormControlLabel>
                </RadioGroup>
                </FormControl>

                </div>
    </DialogContent>
    <DialogActions>
        <Button className="button" onClick={() => {
            this.userUpdate() 
            this.handleClose()}}
            >Update</Button> 
        <Button className="button" onClick={this.handleClose}>Cancel</Button>
    </DialogActions>
    </Dialog>
    </div>

    )
}

}
export default UserEdit