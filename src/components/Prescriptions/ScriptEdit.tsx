import React, { Component } from 'react'
import { Button, FormGroup, TextField, Dialog } from "@material-ui/core"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import APIURL from '../../helpers/environment'


type ScriptEditProps = {
    scriptToUpdate: { [key: string]: any}
    updateOff: () => void
    token: string
    fetchScripts: () => void
}

interface ScriptEditState {
    name: string
    category: string
    expiration: Date | null
    notes: string 
    modal: boolean
}

class ScriptEdit extends Component<ScriptEditProps, ScriptEditState> {
    constructor(props: ScriptEditProps) {
        super(props)
        this.state = {
            modal: true,
            name: this.props.scriptToUpdate.name,
            category: this.props.scriptToUpdate.category,
            expiration: this.props.scriptToUpdate.expiration,
            notes: this.props.scriptToUpdate.notes
        }
    }

scriptUpdate = () => {
    let token = localStorage.getItem('token')
    fetch(`{${APIURL}/script/update/${this.props.scriptToUpdate.id}`, {
        method: "PUT",
        body: JSON.stringify({
            script: {
                name: this.state.name,
                category: this.state.category,
                expiration: this.state.expiration,
                notes: this.state.notes
            },
        }),
        headers: new Headers ({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.token}`,
        }),
    }).then(res => {
        console.log(res)
        this.props.updateOff()
        this.props.fetchScripts()
     
    })
}



handleChangeName = (e: any ) => { this.setState({
    name: e.target.value
})}

handleChangeCategory = (e: any) => { this.setState({
        category: e.target.value
})}

handleChangeExp= (e: any) => { this.setState({
    expiration: e.target.value
})}

handleChangeNotes= (e: any) => { this.setState({
    notes: e.target.value
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
                        label="Name"
                        type="text"
                        name="name"
                        onChange={this.handleChangeName} />
                </div>
                <div>
                    <TextField
                        label="Category"
                        type="text"
                        name="category"
                        onChange={this.handleChangeCategory}/>
                </div>
                <div>
                    <TextField
                        label="Expiration Date"
                        type="date"
                        name="expiration"
                        onChange={this.handleChangeExp}/>
                </div>
                <div>
                    <TextField
                        label="Notes"
                        multiline
                        type="text"
                        name="notes"
                        onChange={this.handleChangeNotes}/>
                </div>

    </ModalBody>
    <ModalFooter>
        <Button onClick={() => {
            this.scriptUpdate() 
            this.toggleModal()}}
            >Update</Button>
    {/* <Button onClick={this.deleteLog}>Delete</Button> */}
    </ModalFooter>
    </Modal>
    </div>

    )
}

}

export default ScriptEdit