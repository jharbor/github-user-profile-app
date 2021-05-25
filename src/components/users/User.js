import React, {useEffect, Fragment, useContext } from 'react'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'
import Repos from '../repos/Repos'
import GithubContext from '../../context/github/githubContext'


const User = ({match}) => {
    // document.title = "Loading..."

	const githubContext = useContext(GithubContext)

	const {getUser, loading, user, repos, getUserRepos } = githubContext

	useEffect(() => {
			// grabs the param passed in app.js on the route path='/user/:login'
			// and plugs it into the api endpoint in the getUser function
			getUser(match.params.login)
			document.title = `${name} | Profile`

			getUserRepos(match.params.login)
			// use this to remove warning if you only want it to run once
			// eslint-disable-next-line
	},[])

	const {
			name,
			avatar_url,
			location,
			bio,
			blog,
			login,
			html_url,
			company,
			followers,
			following,
			public_repos,
			public_gists,
			hireable
	} = user


  


        


        if (loading) {
            return <Spinner/>
        }
        
        // document.title = name + ' | Github Profile'

        return (
            <Fragment>
                <Link to="/" className="btn btn-light">Back to search</Link>
                Hireable: {''}
                {hireable ? <i className="fas fa-check text-success" /> : <i className="fa fa-times-circle text-danger" /> }
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className="round-img" style={{width:'150px'}} alt="" />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                            </Fragment>}
                            <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>User:</strong> {login}
                                </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company:</strong> {company}
                                </Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <strong>Website:</strong> {blog}
                                </Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">
                        Folowers: {followers}
                    </div>
                    <div className="badge badge-success">
                        Folowing: {following}
                    </div>
                    <div className="badge badge-light">
                        Public Repos: {public_repos}
                    </div>
                    <div className="badge badge-dark">
                        Public Gists: {public_gists}
                    </div>
                </div>

            <Repos repos={repos}/>

            </Fragment>
        )
    
}



export default User
