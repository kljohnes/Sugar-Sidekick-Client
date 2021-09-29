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
}

class UserEdit extends Component<UserEditProps, UserEditState> {
    constructor(props: UserEditProps) {
        super(props)
        this.state = {
            modal: true,
            email: this.props.userToUpdate.email,
            role: this.props.userToUpdate.role
        }
    }

userUpdate = () => {
    let token = localStorage.getItem('token')
    fetch(`http://localhost:3000/auth/${this.props.userToUpdate.id}`, {
        method: "PUT",
        body: JSON.stringify({
            script: {
                email: this.state.email,
                role: this.state.role,
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
                <FormControl component="fieldset">
                <FormLabel component="legend">Role</FormLabel>

                <RadioGroup
                 aria-label="role"
                 name="radio-buttons-group">
                <FormControlLabel value="user" onChange={this.handleChangeRole} control={<Radio />} label="User" />
                <FormControlLabel value="admin" onChange={this.handleChangeRole} control={<Radio />} label="Admin"></FormControlLabel>
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