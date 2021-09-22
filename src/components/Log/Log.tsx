import  React, { Component } from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'date', headerName: 'Date', width: 130 },  
  {field: 'time', headerName: 'Time', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'blood-glucose', headerName: 'Blood Glucose', width: 130 },
  { field: 'Carbs', headerName: 'Carbs', width: 130 },
  { field: 'Bolus', headerName: 'Bolus', width: 130 },
  { field: 'Correction', headerName: 'Correction Dose', width: 130 },
  { field: 'Notes', headerName: 'Notes', width: 130 },


];

const rows = [
  { id: 1, lastName : 'Snow', firstName: 'Jon', age: 35 },

];

type AcceptedProps = {
  sessionToken:string | null
}

class Log extends Component<AcceptedProps> {
  constructor(props: AcceptedProps){
    super(props)
  }
render (){
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
  }
}

export default Log