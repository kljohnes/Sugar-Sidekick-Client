import React, { Component } from 'react'
import AdminUserTable from './AdminUserTable'
import UserEdit from './AdminUserEdit'
import AdminUserCreate from './AdminUserCreate'

type AcceptedProps = {
    token: string
    updateToken: (newToken: string) => void
}

interface AdminHomeState {
    users: Array<object>,
    updateActive: boolean,
    userToUpdate: { [key: string ]: string | number}
}
class AdminHome extends Component<AcceptedProps, AdminHomeState> {
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            users: [],
            updateActive: false,
            userToUpdate: {}
        }
    }
fetchUsers = (): void => {
    fetch ("http://localhost:3000/auth/all", {
        method: "GET",
        headers: ({
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.props.token}`,
        }),
    })
    .then((res) => res.json())
    .then(data => {
        this.setState({ users: data })
            console.log(data)
        })
        .catch((error) => console.log(error))
    }
    editUpdateUser = (user: any) => {
        this.setState({ userToUpdate: user })
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    componentDidMount = (): void => {
        this.fetchUsers()
        console.log("ADMIN USER TABLE FETCHED")}

 
    render() {
        return (
            <div>
            <div><AdminUserCreate updateToken={this.props.updateToken} ></AdminUserCreate></div>
                <div><AdminUserTable token={this.props.token} fetchUsers={this.fetchUsers} users={this.state.users} editUpdateUser={this.editUpdateUser} updateOn={this.updateOn}/></div>
                <div>
                    {this.state.updateActive ? (
                    <UserEdit 
                    userToUpdate={this.state.userToUpdate} 
                    updateOff={this.updateOff} token={this.props.token} fetchUsers={this.fetchUsers}/> 
                    ) : (
                    <></>
                    )}
                </div>
            

        
                <h1>Welcome to the Admin Home Page </h1>
                <ul>
                    <li>Get a list of all users</li>
                    <li>Create users</li>
                    <li>Edit and delete users</li>
                </ul>
            </div>
        )
    }
}

export default AdminHome