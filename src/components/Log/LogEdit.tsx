import React, { Component } from 'react'
import { Button, FormGroup, TextField, Dialog, DialogContent, DialogTitle, DialogActions } from "@material-ui/core"
import APIURL from '../../helpers/environment'
import "./Log.css"


type LogEditProps = {
    logToUpdate: { [key: string]: any }
    updateOff: () => void
    token: string
    fetchLogs: () => void
}

interface LogEditState {
    date: Date | string
    time: string
    blood_glucose: number | null
    carbs: number | null
    bolus: number | null
    correction_dose: number | null
    long_acting_dose: number | null
    notes: string | null
    modal: boolean
}

class LogEdit extends Component<LogEditProps, LogEditState> {
    constructor(props: LogEditProps) {
        super(props)
        this.state = {
            modal: true,
            date: this.props.logToUpdate.date,
            time: this.props.logToUpdate.time,
            blood_glucose: this.props.logToUpdate.blood_glucose,
            carbs: this.props.logToUpdate.carbs,
            bolus: this.props.logToUpdate.bolus,
            correction_dose: this.props.logToUpdate.correction_dose,
            long_acting_dose: this.props.logToUpdate.long_acting_dose,
            notes: this.props.logToUpdate.notes
        }
    }

    logUpdate = () => {
        let token = localStorage.getItem('token')
        fetch(`${APIURL}/log/update/${this.props.logToUpdate.id}`, {
            method: "PUT",
            body: JSON.stringify({
                log: {
                    date: this.state.date,
                    time: this.state.time,
                    blood_glucose: this.state.blood_glucose,
                    carbs: this.state.carbs,
                    bolus: this.state.bolus,
                    correction_dose: this.state.correction_dose,
                    long_acting_dose: this.state.long_acting_dose,
                    notes: this.state.notes
                },
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`,
            }),
        }).then(res => {
            console.log(res)
            this.props.updateOff()
            this.props.fetchLogs()

        })
    }

    handleChangeDate = (e: any) => {
        this.setState({
            date: e.target.value
        })
    }

    handleChangeTime = (e: any) => {
        this.setState({
            time: e.target.value
        })
    }

    handleChangeBG = (e: any) => {
        this.setState({
            blood_glucose: e.target.value
        })
    }

    handleChangeCarbs = (e: any) => {
        this.setState({
            carbs: e.target.value
        })
    }

    handleChangeBolus = (e: any) => {
        this.setState({
            bolus: e.target.value
        })
    }

    handleChangeCorrection = (e: any) => {
        this.setState({
            correction_dose: e.target.value
        })
    }

    handleChangeLongActing = (e: any) => {
        this.setState({
            long_acting_dose: e.target.value
        })
    }

    handleChangeNotes = (e: any) => {
        this.setState({
            notes: e.target.value
        })
    }

    handleClose = () => {
        this.setState({ modal: false })
        this.props.updateOff()
    }

    render() {
        return (
            <div>
                <Dialog className="modal" open={this.state.modal} onClose={this.handleClose}>
                    <DialogTitle >
                        Update a log entry.
                    </DialogTitle>
                    <DialogContent>
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
                                onChange={this.handleChangeTime} />
                        </div>
                        <div>
                            <TextField
                                label="Blood Glucose"
                                type="number"
                                name="bloodGlucose"
                                onChange={this.handleChangeBG} />
                        </div>
                        <div>
                            <TextField
                                label="Carbs"
                                type="number"
                                name="carbs"
                                onChange={this.handleChangeCarbs} />
                        </div>
                        <div>
                            <TextField
                                label="Bolus"
                                type="number"
                                name="bolus"
                                onChange={this.handleChangeBolus} />
                        </div>
                        <div>
                            <TextField
                                label="Correction"
                                type="number"
                                name="correction_dose"
                                onChange={this.handleChangeCorrection} />
                        </div>
                        <div>
                            <TextField
                                label="Long Acting Dose"
                                type="number"
                                name="long_acting_dose"
                                onChange={this.handleChangeLongActing} />
                        </div>
                        <div>
                            <TextField
                                label="Notes"
                                multiline
                                type="text"
                                name="notes"
                                onChange={this.handleChangeNotes} />
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button className="button" onClick={() => {
                            this.logUpdate()
                            this.handleClose()
                        }}
                        >Update</Button>
                        <Button className="button" onClick={this.handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default LogEdit