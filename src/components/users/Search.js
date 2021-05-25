import React, {useState, useContext} from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'


// passed in as props from app and destructuring
 const Search = () => {

	const githubContext = useContext(GithubContext)
	const alertContext = useContext(AlertContext)


	// destructuring to store initial state, then updating it
	const [text, setText] = useState("");

	const onChange = (e) => {
		// this.setState({text:e.target.value})
		// allows you to use multiple fields instead of single fields by name
		setText(e.target.value)
		// console.log(e.target.value)
		
	}

	const onSubmit = (e) => {
		e.preventDefault();
		if(text === '') {
			// alert('test')
			alertContext.setAlert('Please enter something', 'light')
		} else {
			// console.log(this.state.text)
			// passing this function as a prop
			githubContext.searchUsers(text)
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
				{githubContext.users.length > 0 ? <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button> : ''}
			</div>
		)

}


export default Search
