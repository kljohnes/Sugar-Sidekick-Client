import React, { Component } from 'react'
import AdminUserTable from './AdminUserTable'
import UserEdit from './AdminUserEdit'
import AdminUserCreate from './AdminUserCreate'
import APIURL from '../../helpers/environment'

type AcceptedProps = {
    token: string
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
    fetch (`${APIURL}/auth/all`, {
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

    // componentDidUpdate(prevProps: AcceptedProps, prevState: AdminHomeState) {
    //     if (prevState.users !== this.state.users){
    //         this.fetchUsers()
    //     }
    
    //     console.log("Component Did Update")
    // }

 
    render() {
        return (
            <div>
            <div><AdminUserCreate ></AdminUserCreate></div>
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