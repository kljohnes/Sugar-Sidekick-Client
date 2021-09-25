import  React, { Component } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@material-ui/core"
import { NavItemProps } from 'reactstrap';

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
  scripts: Array<object>
  fetchScripts: (e:any) => void
  editUpdateScript: (script: Script) => void
  updateOn: () => void
}

export interface Script {
  id?: number,
  name: string,
  category: string,
  expiration: Date | null,
  notes: string
}

class ScriptTable extends Component<AcceptedProps, Script> {
  constructor(props: AcceptedProps) {
    super(props)
    this.state= {
      name: "",
      category: '',
      expiration: null,
      notes: ""
    }
  }
  deleteScript = async (e: any, id: number) => {
    e.preventDefault()
    let token = localStorage.getItem('token')
    await fetch (`http://localhost:3000/script/delete/${id}`, {
      method: 'DELETE',
      headers: new Headers ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
    })
  })
    console.log(e)
    return this.props.fetchScripts(e)
  }

scriptMapper = () => {
  return this.props.scripts.map((script: any, index: number) => {
    return(
      <TableRow key={index}>
        <TableCell component="th" scope="row">
        {script.id}
        </TableCell>
        <TableCell component="td" scope="row">
        {script.name}
        </TableCell>
        <TableCell component="td" scope="row">
        {script.category}
        </TableCell>
        <TableCell component="td" scope="row">
        {script.expiration}
        </TableCell>
        <TableCell component="td" scope="row">
        {script.notes}
        </TableCell>
        <TableCell>
          <Button onClick={() => {
            this.props.editUpdateScript(script)
            this.props.updateOn()
            console.log("update button clicked")
          }}>Edit</Button>
        </TableCell>
        <TableCell>
          <Button onClick={(e)=> {
            this.deleteScript(e, script.id)
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
      <h1>Prescriptions</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Expiration</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.scriptMapper()}</TableBody>

        </Table>
      </TableContainer>

</div>

  );
  }
}

export default ScriptTable