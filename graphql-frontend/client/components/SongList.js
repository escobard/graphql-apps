import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from "react-apollo"

class SongList extends Component{
	render(){
		console.log(this.props)
		return(
					<div>
						<p>test</p>
					</div>
		)
	}
}

// this creates our GQL query, as a simple string template
const query = gql`
	{
		songs{
			title
		}
	}
`

// much like redux, we are binding the query to the component
export default graphql(query)(SongList)