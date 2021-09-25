import React, { Component } from 'react'
import { TextField, Button, FormGroup } from '@material-ui/core'

type ScriptProps = {
    fetchScripts: () => void
    token: string
}

type ScriptState = {
    name: string,
    category: string
    expiration: Date | string
    notes: string | null
}

class ScriptCreate extends Component<ScriptProps, ScriptState> {
    constructor(props: ScriptProps){
        super(props)
        this.state = {
            name: '',
            category: '',
            expiration: '',
            notes: ''
        }
    }

    scriptCreate = (e: React.FormEvent<HTMLFormElement>):void => {
        let token = localStorage.getItem('token')
        e.preventDefault();
    
        fetch("http://localhost:3000/script/create", {
            method: 'POST',
            body: JSON.stringify({
                script:{
                name: this.state.name, 
                category: this.state.category,
                expiration: this.state.expiration,
                notes: this.state.notes
            }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            })
        }).then(response => response.json())
          .then(scriptData => {
              console.log(scriptData)
              this.setState({
                  name: '',
                  category: '',
                  expiration: '',
                  notes: ''
            })
            this.props.fetchScripts()
          })}
    


    handleChangeName = (e: any ) => { this.setState({
        name: e.target.value
    })}
    
    handleChangeCategory = (e: any) => { this.setState({
            category: e.target.value
    })}
    
    handleChangeExp = (e: any) => { this.setState({
        expiration: e.target.value
    })}
    
    handleChangeNotes= (e: any) => { this.setState({
        notes: e.target.value
    })}

    render() {
        return (
            <div>
                <h1>Create a New Prescription</h1>
                <form onSubmit={this.scriptCreate} >
               
                        <div>
                            <TextField
                                label="name"
                                type="text"
                                name="name"
                                onChange={this.handleChangeName} />
                        </div>
                        <div>
                            <TextField
                                label="category"
                                type="text"
                                name="category"
                                onChange={this.handleChangeCategory}/>
                        </div>
                        <div>
                            <p>Expiration date</p>
                            <TextField
                                name="expiration"
                                type="date"
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
                        <Button type="submit">SUBMIT</Button>
             
                </form>
            </div>

        )
    }
}

export default ScriptCreate