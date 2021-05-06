import React, { Fragment } from 'react'
import spinner from './spinner.gif'

 const Spinner = () => {
	 return (
		<Fragment>
	<img style={{width:'200px', margin:'auto', display: 'block'}} src={spinner} alt="Loading..."/>
	</Fragment>
 )
}

export default Spinner