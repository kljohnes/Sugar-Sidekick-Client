import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import '../App.css';
import { Link } from "react-router-dom"
import {BsPencilSquare, BsPersonFill} from 'react-icons/bs'
import {BsFillHouseDoorFill, BsFillPersonFill } from 'react-icons/bs'

type AcceptedProps = {
  clearToken: () => void;
  // sessionToken: string | null
  updateToken: (newToken:string) => void
  updateRole: (newRole:string) => void

}

type NavState = {
  auth: boolean
}

class Nav extends React.Component<AcceptedProps, NavState> {
  constructor(props: AcceptedProps){
  super(props)
    }
render() {

    return (
        
        <AppBar  position="static" className="navbar">
           
          <Toolbar className="toolbar" style={{
            backgroundColor: "#8CBA80", display: "flex", justifyContent: "space-between", height: 
            '4rem' }}> 
        
          <Typography variant="h4">Welcome! </Typography>
          <IconButton edge="start" color="secondary" aria-label="menu">
            <Link className="nav_links" to="/"><BsFillHouseDoorFill/></Link></IconButton>
          
            <IconButton edge="start" color="secondary" aria-label="menu">
            <Link className="nav_links" to="/LogIndex"><BsPencilSquare/></Link></IconButton>
            <IconButton edge="start" color="secondary" aria-label="menu">
            <Link className="nav_links" to="/Auth">Login or Signup</Link></IconButton>
            <IconButton edge="start" color="secondary" aria-label="menu"> 
            <Link className="nav_links" to="/ScriptIndex">Prescriptions</Link></IconButton>
            <IconButton edge="start" color="secondary" aria-label="menu"> 
            <Link className="nav_links" to="/Profile"><BsFillPersonFill/></Link></IconButton>
            <Link className="nav_links" to="/CarbCount">Carb Count</Link>
            <Link className="nav_links" to="/AdminHome">Admin</Link>
            <Link className="nav_links" to= "/Contact">Formspree</Link>
            <Button color="secondary" onClick={this.props.clearToken}><Typography color="warning">Log Out</Typography></Button>
           
            </Toolbar>
            </AppBar>
        
    );
  }
  }
  export default Nav;




