import React, { Component } from 'react';
import LogCreate from './LogCreate';
import LogTable from './LogTable';
import { Log } from './LogTable';
import LogEdit from './LogEdit';
import APIURL from '../../helpers/environment'

type AcceptedProps = {
    token: string 
}

interface LogIndexState {
   logs: Array<object>,
   updateActive: boolean,
   logToUpdate: { [key: string ]: string | number}
}

class LogIndex extends Component <AcceptedProps, LogIndexState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            logs: [],
            updateActive: false,
            logToUpdate: {}

        }
    }

    fetchLogs = (): void => {
        let token = localStorage.getItem('token')
        console.log("Are we fetching now????");
          fetch(`http://${APIURL}/log/mine`, {
          
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.props.token}`,
            }),
          })
          .then((res) => res.json())
          .then(logData => {
            this.setState({ logs: logData })
            console.log(logData)
            })
          .catch((error) => console.log(error))
        }

    editUpdateLog = (log: any) => {
        this.setState({ logToUpdate: log })
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    componentDidMount = (): void => {
        this.fetchLogs()
        console.log("LOG TABLE FETCHED")}

    render() {
        return(
            <div>
            <div><LogCreate token={this.props.token} fetchLogs={this.fetchLogs}/></div>
                <div><LogTable token={this.props.token} fetchLogs={this.fetchLogs} logs={this.state.logs} editUpdateLog={this.editUpdateLog} updateOn={this.updateOn}/></div>
                <div>
                    {this.state.updateActive ? (
                    <LogEdit 
                    logToUpdate={this.state.logToUpdate} 
                    updateOff={this.updateOff} token={this.props.token} fetchLogs={this.fetchLogs}/> 
                    ) : (
                    <></>
                    )}
                </div>
            </div>
            )
    }
}

export default LogIndex