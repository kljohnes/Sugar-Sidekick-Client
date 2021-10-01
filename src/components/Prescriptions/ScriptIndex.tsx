import React, { Component } from 'react';
import ScriptCreate from './ScriptCreate';
import ScriptTable from './ScriptTable';
import ScriptEdit from './ScriptEdit';
import APIURL from '../../helpers/environment'


type AcceptedProps = {
    token: string 
}

interface ScriptIndexState {
   scripts: Array<object>,
   updateActive: boolean,
   scriptToUpdate: { [key: string ]: string | number}
}

class ScriptIndex extends Component <AcceptedProps, ScriptIndexState>{
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            scripts: [],
            updateActive: false,
            scriptToUpdate: {}

        }
    }

    fetchScripts = (): void => {
        let token = localStorage.getItem('token')
          fetch(`${APIURL}/script/mine`, {
          
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.props.token}`,
            }),
          })
          .then((res) => res.json())
          .then(scriptData => {
            this.setState({ scripts: scriptData })
            console.log(scriptData)
            })
          .catch((error) => console.log(error))
        }

    editUpdateScript = (script: any) => {
        this.setState({ scriptToUpdate: script })
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    componentDidMount = (): void => {
        this.fetchScripts()
        console.log("Prescription TABLE FETCHED")}

    render() {
        return(
            <div>
            <div><ScriptCreate token={this.props.token} fetchScripts={this.fetchScripts}/></div>
                <div><ScriptTable token={this.props.token} fetchScripts={this.fetchScripts} scripts={this.state.scripts} editUpdateScript={this.editUpdateScript} updateOn={this.updateOn}/></div>
                <div>
                    {this.state.updateActive ? (
                    <ScriptEdit 
                    scriptToUpdate={this.state.scriptToUpdate} 
                    updateOff={this.updateOff} token={this.props.token} fetchScripts={this.fetchScripts}/> 
                    ) : (
                    <></>
                    )}
                </div>
            </div>
            )
    }
}

export default ScriptIndex