import React, { Component } from 'react'
import { Button,TextField, Radio, RadioGroup, FormControl, FormLabel } from "@material-ui/core"
import { Modal, ModalHeader , ModalBody, ModalFooter } from 'reactstrap'
import { FormControlLabel } from '@mui/material'


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
    fetch(`http://localhost:3000/auth/${this.props.userToUpdate.id}`, {
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

handleChangeEmail = (e: any ) => { this.setState({
    email: e.target.value
})}

handleChangeRole = (e: any) => { this.setState({
        role: e.target.value
})}

handleChangePassword = (e: any) => { this.setState({
    password: e.target.value
})}

toggleModal = () => {
    this.setState({ modal: false })
    this.props.updateOff()
}

render() {
    return (
        <div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>
                Update a log entry.
            </ModalHeader>
            <ModalBody>
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
    </ModalBody>
    <ModalFooter>
        <Button onClick={() => {
            this.userUpdate() 
            this.toggleModal()}}
            >Update</Button>
    </ModalFooter>
    </Modal>
    </div>

    )
}

}
export default UserEdit