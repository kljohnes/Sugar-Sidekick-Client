import  React, { Component } from 'react'
import {Button,  Card, CardHeader, CardContent, IconButton, Container, Grid, CardActions} from "@material-ui/core"
import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import APIURL from '../../helpers/environment'
import { Typography } from '@mui/material';


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
  
    let token = localStorage.getItem('token')
    await fetch (`${APIURL}/script/delete/${id}`, {
      method: 'DELETE',
      headers: new Headers ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
    })
  })
    
    return this.props.fetchScripts(e)
  }

  scriptMapper = () => {
    return this.props.scripts.map((script: any, index: number) => {
      return (
        <Grid item key={script.id} xs={12} md={6} lg={4}>
          <Card elevation={1}>
            <CardHeader style={{backgroundColor: "#CACF85"}} title={script.name}
              subheader={script.category}></CardHeader>
            <CardContent>
              <Typography component={'div'}>
               <p>Expiration: {script.expiration}</p>
              
                {script.notes}
              </Typography>
            </CardContent>
            <CardActions style={{backgroundColor: "#CACF85"}}>
              <IconButton onClick={(e: any) => {
                this.deleteScript(e, script.id)
                console.log("Delete button clicked")
              }}>
                <DeleteOutlined />
              </IconButton>
              <IconButton onClick={() => {
                this.props.editUpdateScript(script)
                this.props.updateOn()
                console.log("Update button clicked")
              }}>
                <EditOutlined />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>

    )})
}
render (){
  return (
    <div>
      <h1 style={{textAlign: "center"}}> My Prescriptions</h1>
      <Container>
        <Grid container spacing={3}>
       
        {this.scriptMapper()}
     
        </Grid>
      </Container>


</div>

  );
  }
}

export default ScriptTable