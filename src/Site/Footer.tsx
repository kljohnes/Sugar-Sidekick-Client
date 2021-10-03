import React, { Component } from 'react'
import './Footer.css'
import { FaGithub } from 'react-icons/fa'
import { IconButton } from "@material-ui/core"
import { Link } from "react-router-dom"


export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div>Copyright Katherine Johnes - 2021</div>
                <div id="github"><IconButton edge="start" style={{ color: "#CACF85"}}>
            <a href="https://github.com/kljohnes/Sugar-Sidekick-Client"><FaGithub/></a></IconButton>
            </div>
            </footer>
        )
    }
}
