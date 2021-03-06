import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import '../App.css';
import { Link } from "react-router-dom"
import {BsPencilSquare, BsFillHouseDoorFill, BsFillPersonFill} from 'react-icons/bs'
import {FaFilePrescription} from 'react-icons/fa'
import {BiCalculator, BiHelpCircle, BiLock } from 'react-icons/bi'
import { GiCancel } from "react-icons/gi"


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
          <Typography variant="h4" className="navText">Sugar Sidekick</Typography>
          <Tooltip title="Home">
          <IconButton edge="start" style={{ color: "#CACF85"}}>
            <Link className="nav_links" to="/"><BsFillHouseDoorFill/></Link></IconButton></Tooltip>
            <Tooltip title="Profile"><IconButton edge="start" color="secondary"> 
            <Link className="nav_links" to="/GetProfile"><BsFillPersonFill/></Link></IconButton></Tooltip>
            <Tooltip title="Log"><IconButton edge="start" color="secondary">
            <Link className="nav_links" to="/LogIndex"><BsPencilSquare/></Link></IconButton></Tooltip>
            {/* <IconButton edge="start" color="secondary" aria-label="menu">
            <Link className="nav_links" to="/Auth">Login</Link></IconButton> */}
            <Tooltip title="Prescriptions"><IconButton edge="start" color="secondary" aria-label="menu"> 
            <Link className="nav_links" to="/ScriptIndex"><FaFilePrescription/></Link></IconButton></Tooltip>
            <Tooltip title="Carb Calculator"><IconButton edge="start" color="secondary"><Link className="nav_links" to="/CarbCount"><BiCalculator/></Link></IconButton></Tooltip>
          <Tooltip title="Contact"><IconButton edge="start" color="secondary"><Link className="nav_links" to="/Contact"><BiHelpCircle/></Link></IconButton></Tooltip>
            <Tooltip title="Log Out"><IconButton edge="start" style={{color: "#4D5382"}} className="nav_links" onClick={this.props.clearToken} ><GiCancel/></IconButton></Tooltip>
            </Toolbar>
          </AppBar>
        
    )
  }
  }
  export default Nav;




