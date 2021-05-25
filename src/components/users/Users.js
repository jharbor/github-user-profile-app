import React, {useContext} from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import GithubContext from '../../context/github/githubContext'

// passed in as props from app and destructuring
const Users = ({}) => {
	const githubContext = useContext(GithubContext)

	

	// destructuring allows us to use structure as is
	const {loading, users} = githubContext

		if(loading){
			return <Spinner />
		} else {
			return (
				<div style={userStyle}>
					{githubContext.users.map(user => (
						<UserItem key={user.id} user={user} />
					))}
				</div>
			)
		}
	

}



const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem'
}

export default Users
