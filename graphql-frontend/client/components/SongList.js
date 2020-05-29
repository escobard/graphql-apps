import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from "react-apollo"

class SongList extends Component{
	renderSongs(){
		return this.props.data.songs.map((song, index)=>{
			return(
					<li key={index} className="collection-item">
						{song.title}
					</li>
				)
		})
	}
	render(){
		return(
					<div>
						<p>SongList</p>
						<ul>
							{this.props.data.loading ? <p>Loading...</p> : this.renderSongs()}
						</ul>
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