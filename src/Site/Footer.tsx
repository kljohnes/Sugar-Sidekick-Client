import React, { Component } from 'react'
import './Footer.css'
import { FaGithub } from 'react-icons/fa'
import { IconButton, Tooltip, Toolbar, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import { BiLock } from 'react-icons/bi'


export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <Toolbar style={{display: "flex", justifyContent: "space-evenly"}}>
                <Tooltip title="Admin"><IconButton edge="start" color="secondary"><Link className="nav_links" to="/AdminHome"><BiLock /></Link></IconButton></Tooltip>
                <Typography>Copyright Katherine Johnes - 2021</Typography>
                <Tooltip title="Github"><IconButton edge="start" >
                    <a target="blank" href="https://github.com/kljohnes/Sugar-Sidekick-Client" style={{ color: "#514663" }}><FaGithub /></a></IconButton>
                </Tooltip>
                </Toolbar>
            </footer>
        )
    }
}
