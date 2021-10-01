import React, { Component } from 'react'
import {Button, TableRow, TableCell, Table, TableContainer, TableHead, TableBody} from "@material-ui/core"
import APIURL from '../../helpers/environment'


type AcceptedProps = {
    token: string 
    users: Array<object>
    fetchUsers: () => void
    editUpdateUser: (user:User) => void
    updateOn: () => void
}

interface User {
    id?: number,
    email: string,
    role: string

}

class AdminUserTable extends Component<AcceptedProps, User> {
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            email: '',
            role: ''
        }
    }
    deleteUser= async (id: number) => {
        let token = localStorage.getItem('token')
        await fetch (`http://${APIURL}/auth/${id}`, {
          method: 'DELETE',
          headers: new Headers ({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.props.token}`,
        })
      })
        
        return this.props.fetchUsers()
      }
    

userMapper = () => {
    console.log("User Mapper")
    if (this.props.users){
    return this.props.users.map((user: any, index: number) => {
        return (
            <TableRow key={index}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
          <Button onClick={() => {
            this.props.editUpdateUser(user)
            this.props.updateOn()
            console.log("update button clicked")
          }}>Edit</Button>
        </TableCell>
        <TableCell>
        <Button onClick={()=> {
            this.deleteUser(user.id)
            console.log("Delete button clicked")
        }}>Delete</Button>
        </TableCell>
            </TableRow>
        )
    })}
}

render() {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Password</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{this.userMapper()}</TableBody>

            </Table>
        </TableContainer>
    )
}

}

export default AdminUserTable