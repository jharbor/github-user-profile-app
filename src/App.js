// import logo from './logo.svg';
import React, {Component} from 'react';
import Navbar from './components/layout/Navbar'
import './App.css';
import Users from './components/users/Users'
import axios from 'axios'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
 class App extends Component {

	state = {
		users:[],
		loading:false,
		alert:null,
	}

	async componentDidMount(){

		this.setState({loading: true})

		// console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)

		const res = await axios.get(`https://api.github.com/users?client_id${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
		console.log(res.data)

		this.setState({users: res.data, loading: false})

	}

	// coming from Search.js
	searchUsers = async (text) => {
		// console.log(text)
		this.setState({loading: true})

		// console.log(process.env.EACT_APP_GITHUB_CLIENT_ID)

		const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
		console.log(res.data)

		this.setState({users: res.data.items, loading: false})
	}

	clearUsers = () => {		this.setState({users: [], loading: false})}

	setAlert = (msg, type) => {
		this.setState({alert: {msg: msg, type: type} })


		setTimeout(()=> this.setState({alert: null}), 5000)

	}


	render() {


		const {users, loading} = this.state;

		return (
			
			<div className='App'>
				<Navbar /*title="Override"*/ />
				<div className="container">
					<Alert alert={this.state.alert} type={this.state.type}/>
					<Search 
						clearUsers={this.clearUsers} 
						searchUsers={this.searchUsers} 
						showClear={users.length > 0 ? true : false} 
						setAlert={this.setAlert}
						/>
					<Users loading={loading} users={users} />
				</div>
			</div>
		);
	}
}

export default App;

