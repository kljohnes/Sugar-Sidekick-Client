import  React, { Component } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@material-ui/core"

// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'date', headerName: 'Date', width: 130 },  
//   {field: 'time', headerName: 'Time', width: 130 },
//   { field: 'category', headerName: 'Category', width: 130 },
//   { field: 'blood-glucose', headerName: 'Blood Glucose', width: 130 },
//   { field: 'Carbs', headerName: 'Carbs', width: 130 },
//   { field: 'Bolus', headerName: 'Bolus', width: 130 },
//   { field: 'Correction', headerName: 'Correction Dose', width: 130 },
//   { field: 'Notes', headerName: 'Notes', width: 130 },


// ];

// const rows = [
//   { id: 1, lastName : 'Snow', firstName: 'Jon', age: 35 },

// ];

type AcceptedProps = {
  token:string 
  logs: Array<object>
  fetchLogs: (e:any) => void
  editUpdateLog: (log: Log) => void
  updateOn: () => void
}

export interface Log {
  id?: number,
  date: Date | null
  time: string,
  bloodGlucose: number,
  carbs: number,
  bolus: number,
  correction_dose: number,
  notes: string
}

class LogTable extends Component<AcceptedProps, Log> {
  constructor(props: AcceptedProps) {
    super(props)
    this.state= {
      id: 0,
      date: null,
      time: "",
      bloodGlucose: 0,
      carbs: 0,
      bolus: 0,
      correction_dose: 0,
      notes: ""
    }
  }
  deleteLog = async (e: any, id: number) => {
    e.preventDefault()
    let token = localStorage.getItem('token')
    await fetch (`http://localhost:3000/log/delete/${id}`, {
      method: 'DELETE',
      headers: new Headers ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
    })
  })
    console.log(e)
    return this.props.fetchLogs(e)
  }

logMapper = () => {
  return this.props.logs.map((log: any, index: number) => {
    return(
      <TableRow key={index}>
        <TableCell component="th" scope="row">
        {log.id}
        </TableCell>
        <TableCell component="td" scope="row">
        {log.date}
        </TableCell>
        <TableCell component="td" scope="row">
        {log.time}
        </TableCell>
        <TableCell component="td" scope="row">
        {log.bloodGlucose}
        </TableCell>
        <TableCell component="td" scope="row">
        {log.carbs}
        </TableCell>
        <TableCell component="th" scope="row">
        {log.bolus}
        </TableCell>
        <TableCell component="td" scope="row">
        {log.correction_dose}
        </TableCell>
        <TableCell component="td" scope="row">
        {log.notes}
        </TableCell>
        <TableCell>
          <Button onClick={() => {
            this.props.editUpdateLog(log)
            this.props.updateOn()
            console.log("update button clicked")
          }}>Edit</Button>
        </TableCell>
        <TableCell>
          <Button onClick={(e)=> {
            this.deleteLog(e, log.id)
            console.log("Delete button clicked")
          }}>Delete</Button>
        </TableCell>
      </TableRow>
    )})
}
render (){
  return (
    // console.log("ARE WE WORKING?????????")
    <div>
      <h1>Log Entries</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Blood Glucose</TableCell>
              <TableCell>Carbs</TableCell>
              <TableCell>Bolus</TableCell>
              <TableCell>Correction Dose</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.logMapper()}</TableBody>

        </Table>
      </TableContainer>

</div>

  );
  }
}

export default LogTable