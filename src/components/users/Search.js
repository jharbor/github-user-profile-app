import React, {useState} from 'react'
import PropTypes from 'prop-types'

 const Search = ({searchUsers, showClear,clearUsers, setAlert}) => {

	const [text, setText] = useState('');

	const onChange = (e) => {
		// this.setState({text:e.target.value})
		// allows you to use multiple fields instead of single fields by name
		setText(e.target.value)
		// console.log(e.target.value)
		
	}

	const onSubmit = (e) => {
		e.preventDefault();
		if(text === '') {
			setAlert('Please enter something', 'light')
		} else {
			// console.log(this.state.text)
			// passing this function as a prop
			searchUsers(text)
			setText('');
		}
	}




		return (
			<div>
				<form onSubmit={onSubmit} className="form">
					<input 
					type="text" 
					name="text" 					
					placeholder="Search users..."
					value={text}
					onChange={onChange}/>
					<input type="submit" className="btn btn-dark btn-block" 

					/>
				</form>
				{showClear ? <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> : ''}
			</div>
		)

}

Search.propTypes = {
	
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		showClear: PropTypes.bool.isRequired,
		setAlert: PropTypes.func.isRequired,
	
}

export default Search
