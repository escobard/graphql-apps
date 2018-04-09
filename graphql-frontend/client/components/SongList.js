import React, { Component } from 'react';
import gql from 'graphql-tag';

class SongList extends Component{
	render(){
		return(
					<div>
						<p>test</p>
					</div>
		)
	}
}

const query = gql`
	{
		songs{
			title
		}
	}
`

export default SongList