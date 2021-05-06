import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {

	state = {
		text:'',
	}

	static propTypes = {
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		showClear: PropTypes.bool.isRequired,
		setAlert: PropTypes.func.isRequired,
	}

	onChange = (e) => {
		// this.setState({text:e.target.value})
		// allows you to use multiple fields instead of single fields by name
		this.setState({[e.target.name]:e.target.value})
		// console.log(e.target.value)
		
	}

	onSubmit = (e) => {
		e.preventDefault();
		if(this.state.text == '') {
			this.props.setAlert('Please enter something', 'light')
		} else {
			// console.log(this.state.text)
			// passing this function as a prop
			this.props.searchUsers(this.state.text)
			this.setState({text:''})
		}
	}

	render() {

		const {showClear, clearUsers} = this.props

		return (
			<div>
				<form onSubmit={this.onSubmit} className="form">
					<input 
					type="text" 
					name="text" 					
					placeholder="Search users..."
					value={this.state.text}
					onChange={this.onChange}/>
					<input type="submit" className="btn btn-dark btn-block" 

					/>
				</form>
				{showClear ? <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> : ''}
			</div>
		)
	}
}

export default Search
