import React, {Fragment, Component, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import axios from 'axios'
import './App.css';

const App = () => {

	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);


	// // async componentDidMount(){

	// 	this.setState({loading: true})

	// 	// console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)

	// 	const res = await axios.get(`https://api.github.com/users?client_id${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
	// 	// console.log(res.data)

	// 	this.setState({users: res.data, loading: false})

	// // }

	// coming from Search.js
	const searchUsers = async (text) => {
		// console.log(text)
		// this.setState({loading: true})
		setLoading(true)

		// console.log(process.env.EACT_APP_GITHUB_CLIENT_ID)

		const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
		console.log(res.data)

		// this.setState({users: res.data.items, loading: false})
		setUsers(res.data.items)
		setLoading(false)
	}

	// Get single github user
	const getUser = async (username) => {
		// this.setState({loading: true})
		setLoading(true)
		const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
		console.log('User object: ')
		console.log(res.data)
		
		// set user obj to res.data
		// this.setState({user: res.data, loading: false})
		setUser(res.data)
		setLoading(false)
	}

	// Get single github user repos
	const getUserRepos = async (username) => {
		// this.setState({loading: true})
		setLoading(true)
		const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
		console.log('User object: ')
		console.log(res.data)
		
		// set user obj to res.data
		// this.setState({repos: res.data, loading: false})
		setRepos(res.data)
		setLoading(false)
	}

	const clearUsers = () => {
		setUsers([])
		setLoading(false)
	}

	const showAlert = (msg, type) => {
		// this.setState({alert: {msg: msg, type: type} })
		setAlert({msg, type})
		setTimeout(()=> setAlert(null), 5000)

	}
		// const {users, user, loading,repos } = this.state;

		return (
			<Router>
			<div className='App'>
				<Navbar /*title="Override"*/ />
				<div className="container">
					<Alert alert={alert}/>
					<Switch>
						<Route exact path='/' render={props => (
							<Fragment>
							{document.title = 'Github User Search'}
							<Search 
							clearUsers={clearUsers} 
							searchUsers={searchUsers} 
							showClear={users.length > 0 ? true : false} 
							setAlert={showAlert}
							/>
							<Users loading={loading} users={users} />	
							</Fragment>
						)}/>
						<Route exact path ='/about' component={About}/>
						<Route exact path='/user/:login' render={ props => (
							<User repos={repos} getUserRepos={getUserRepos} { ...props } getUser={getUser} user={user} loading={loading}/>
						)} />
					</Switch> 
				</div>
			</div>
			</Router>
		);
	
}
 
export default App;

