import React, { Component } from 'react'
import { TextField, Button, FormGroup } from '@material-ui/core'

type LogProps = {
    fetchLogs: () => void
    token: string
}

type LogState = {
    date: Date | string,
    time: string,
    blood_glucose: number | null 
    carbs: number | null
    bolus: number | null
    correction_dose: number | null
    long_acting_dose: number | null
    notes: string | null
}

class LogCreate extends Component<LogProps, LogState> {
    constructor(props: LogProps){
        super(props)
        this.state = {
            date: '',
            time: '',
            blood_glucose: 0,
            carbs: 0,
            bolus: 0,
            correction_dose: 0,
            long_acting_dose: 0,
            notes: ''
        }
        // this.logCreate = this.logCreate.bind(this)
    }

    logCreate = (e: React.FormEvent<HTMLFormElement>):void => {
        let token = localStorage.getItem('token')
        e.preventDefault();
    
        fetch("http://localhost:3000/log/create", {
            method: 'POST',
            body: JSON.stringify({
                log:{
                date: this.state.date, 
                time: this.state.time,
                blood_glusose: this.state.blood_glucose,
                carbs: this.state.carbs,
                bolus: this.state.bolus,
                correction_dose: this.state.correction_dose,
                long_acting_dose: this.state.long_acting_dose,
                notes: this.state.notes
            }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            })
        }).then(response => response.json())
          .then(logData => {
              console.log(logData)
              this.setState({
                  date: '',
                  time: '',
                  blood_glucose: 0,
                  carbs: 0,
                  bolus: 0,
                  correction_dose: 0,
                  long_acting_dose: 0,
                  notes: ''
            })
            this.props.fetchLogs()
          })}
    


    handleChangeDate = (e: any ) => { this.setState({
        date: e.target.value
    })}
    
    handleChangeTime = (e: any) => { this.setState({
            time: e.target.value
    })}
    
    handleChangeBG = (e: any) => { this.setState({
        blood_glucose: e.target.value
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

    handleChangeLongActing = (e: any) => { this.setState({
        long_acting_dose: e.target.value
    })}

    handleChangeNotes= (e: any) => { this.setState({
        notes: e.target.value
    })}

    render() {
        return (
            <div>
                <h1>Create a Log Entry</h1>
                <form onSubmit={this.logCreate} >
               
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
                                label="Long Acting Dose"
                                type="number"
                                name="long_acting_dose"
                                onChange={this.handleChangeLongActing}/>
                            
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

export default LogCreate