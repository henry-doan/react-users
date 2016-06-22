import React from 'react'
import Users from './Users'
import AddUser from './AddUser'
import { BASE_URL } from './constants'
import $ from 'jquery'


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { users: [] }
    }

    componentWillMount() {
    	$.ajax({
    		url: `${BASE_URL}/users`,
    		type: 'GET'
    	})
    	.done( users => {
    		this.setState({ users })
    	})
    }

    deleteUser(id) {
    	event.preventDefault()
    	$.ajax({
    		url: `${BASE_URL}/users/${id}`,
    		type: 'DELETE'
    	})
    	.done( () => {
    		let index = this.state.users.findIndex( user => user.id === id )
    		this.setState({
    			users: [
    				...this.state.users.slice(0, index),
    				...this.state.users.slice(index + 1, this.state.users.length)
    			]
    		})
    	})
    }

    addUser(user) {
    	this.setState({ users: [ ...this.state.users, { ...user } ] })
    }

    render() {
      return(
      	<div className="row">
      		<Users users={this.state.users} deleteUser={this.deleteUser.bind(this)} />
      		<AddUser addUser={this.addUser.bind(this)} />
      	</div>
     )
    }
}

export default Home
