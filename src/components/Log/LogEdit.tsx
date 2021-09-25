import React, { Component } from 'react'
import { Button, FormGroup, TextField, Modal } from "@material-ui/core"
import { Log } from './LogTable'

type LogEditProps = {
    logToUpdate: Log
    updateOff: () => void
    token: string
    fetchLogs: () => void
}
class LogEdit extends Component<LogEditProps, Log> {
    constructor(props: LogEditProps) {
        super(props)
        this.state = {
            date: this.props.logToUpdate.date,
            time: this.props.logToUpdate.time,
            bloodGlucose: this.props.logToUpdate.bloodGlucose,
            carbs: this.props.logToUpdate.carbs,
            bolus: this.props.logToUpdate.bolus,
            correction_dose: this.props.logToUpdate.bolus,
            notes: this.props.logToUpdate.notes
        }
    }

logUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    fetch(`http://localhost:3000/log/update${this.props.logToUpdate.id}`, {
        method: "PUT",
        body: JSON.stringify({
            log: {
                date: this.state.date,
                time: this.state.time,
                bloodGlucose: this.state.bloodGlucose,
                carbs: this.state.carbs,
                bolus: this.state.bolus,
                correction_dose: this.state.bolus,
                notes: this.state.notes
            },
        }),
        headers: new Headers ({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.token}`,
        }),
    }).then(res => {
        console.log(res)
        this.props.fetchLogs()
        this.props.updateOff()
    })
}


handleChangeDate = (e: any ) => { this.setState({
    date: e.target.value
})}

handleChangeTime = (e: any) => { this.setState({
        time: e.target.value
})}

handleChangeBG = (e: any) => { this.setState({
    bloodGlucose: e.target.value
})}

handleChangeCarbs = (e: any) => { this.setState({
    carbs: e.target.value
})}

handleChangeBolus = (e: any) => { this.setState({
    bolus: e.target.value
})}

handleChangeCorrection = (e: any) => { this.setState({
    correction_dose: e.target.value
})}

handleChangeNotes= (e: any) => { this.setState({
    notes: e.target.value
})}

render() {
    return (
        <div>
        <h1>Update an entry</h1>
        <form>
       
                <div>
                    <TextField
                        type="date"
                        name="date"
                        onChange={this.handleChangeDate} />
                </div>
                <div>
                    <TextField
                        label="Time"
                        type="text"
                        name="time"
                        onChange={this.handleChangeTime}/>
                </div>
                <div>
                    <TextField
                        label="Blood Glucose"
                        type="number"
                        name="bloodGlucose"
                        onChange={this.handleChangeBG}/>
                </div>
                <div>
                    <TextField
                        label="Carbs"
                        type="number"
                        name="carbs"
                        onChange={this.handleChangeCarbs}/>
                </div>
                <div>
                    <TextField
                        label="Bolus"
                        type="number"
                        name="bolus"
                        onChange={this.handleChangeBolus}/>
                </div>
                <div>
                    <TextField
                        label="Correction"
                        type="number"
                        name="correction_dose"
                        onChange={this.handleChangeCorrection}/>
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

export default LogEdit