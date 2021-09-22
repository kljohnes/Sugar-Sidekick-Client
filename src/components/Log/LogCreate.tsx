import React, { Component } from 'react'
import { Form, Formik } from 'formik'
import { TextField, Typography, Button } from '@material-ui/core'

interface LogProps {

}

interface LogState {
    date: Date | string,
    time: string,
    category: string,
    bloodGlucose: number,
    carbs: number,
    bolus: number,
    correction_dose: number,
    notes: string
}

export default class LogCreate extends Component<LogProps, LogState> {
    constructor(props: LogProps){
        super(props)
        this.state = {
            date: '',
            time: '',
            category: '',
            bloodGlucose: 0,
            carbs: 0,
            bolus:0,
            correction_dose: 0,
            notes: ''
        }
        this.logCreate = this.logCreate.bind(this)
    }

    logCreate(values: LogState):void {
        fetch("http://localhost:3000/log/create", {
            method: 'POST',
            body: JSON.stringify({log:{
                date: this.state.date, 
                time: this.state.time,
                category: this.state.category,
                bloodGlusose: this.state.bloodGlucose,
                carbs: this.state.carbs,
                bolus: this.state.bolus,
                correction_dose: this.state.correction_dose,
                notes: this.state.notes
            }}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
            ).then((data) => {
               console.log(data)
               this.setState(data)


            })
            .catch((err) => console.log(err))
    } 
    

    render() {
        return (
            <div>
  
            <Typography>Add A Log Entry</Typography>
            <Formik
            initialValues={{date: '', time: '', category: '', bloodGlucose: 0, carbs: 0, bolus: 0, correction_dose: 0, notes: ''}}
            onSubmit={(values)=> {
                this.logCreate(values)}}>
            {({ values, handleChange, handleBlur, errors, touched  }) => (
            <Form>
                <div>
                    <TextField
                    name="date"
                    type="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                {/* {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                ) : null } */}
                </div> 
                <div>
                    <TextField
                    name="time"
                    type="time"
                    value={values.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                     {/* {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                ) : null } */}
                </div>
               
                <div>
                    <TextField
                    name="bloodGlucose"
                    label="Blood Glucose"
                    type="number"
                    value={values.bloodGlucose}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                     {/* {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                ) : null } */}
                </div>
                <div>
                    <TextField
                    name="carbs"
                    label="Carb (grams)"
                    type="number"
                    value={values.carbs}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                     {/* {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                ) : null } */}
                </div>         <div>
                    <TextField
                    name="bolus"
                    label="Bolus (units)"
                    type="number"
                    value={values.bolus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                     {/* {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                ) : null } */}
                </div>
                <div>
                    <TextField
                    name="correction_dose"
                    label="Correction Dose (units)"
                    type="number"
                    value={values.correction_dose}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                     {/* {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                ) : null } */}
                </div>
                <div>
                    <TextField
                    name="Notes"
                    label="Notes"
                    type="text"
                    value={values.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                     {/* {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                ) : null } */}
                </div>

                <Button type="submit">Submit</Button>
                <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>)}


</Formik>
</div>
            
        )
    }
}

