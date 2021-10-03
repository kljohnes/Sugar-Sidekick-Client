import  React, { Component } from 'react'
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from "@material-ui/core"
import APIURL from '../../helpers/environment'
import "./Log.css"

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
  blood_glucose: number,
  carbs: number,
  bolus: number,
  correction_dose: number,
  long_acting_dose: number,
  notes: string
}

class LogTable extends Component<AcceptedProps, Log> {
  constructor(props: AcceptedProps) {
    super(props)
    this.state= {
      id: 0,
      date: null,
      time: "",
      blood_glucose: 0,
      carbs: 0,
      bolus: 0,
      correction_dose: 0,
      long_acting_dose: 0,
      notes: ""
    }
  }
  deleteLog = async (e: any, id: number) => {
    e.preventDefault()
    let token = localStorage.getItem('token')
    await fetch (`${APIURL}/log/delete/${id}`, {
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
        {log.blood_glucose}
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
        {log.long_acting_dose}
        </TableCell>
        <TableCell component="td" scope="row">
        {log.notes}
        </TableCell>
        <TableCell>
          <Button className="button" onClick={() => {
            this.props.editUpdateLog(log)
            this.props.updateOn()
            console.log("update button clicked")
          }}>Edit</Button>
        </TableCell>
        <TableCell>
          <Button className="button" onClick={(e)=> {
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
      <h1 id="Log">My Log Entries</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead >
            <TableRow  >
              <TableCell>id</TableCell>
              <TableCell>Date
                <TableSortLabel active={"date"==="date"}>
                </TableSortLabel>
              </TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Blood Glucose</TableCell>
              <TableCell>Carbs</TableCell>
              <TableCell>Bolus</TableCell>
              <TableCell>Correction Dose</TableCell>
              <TableCell>Long Acting Dose</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{backgroundColor: "#CACF85"}}>{this.logMapper()}</TableBody>

        </Table>
      </TableContainer>

</div>

  );
  }
}

export default LogTable