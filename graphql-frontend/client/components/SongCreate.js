import React, { Component } from 'react'
import gql from "graphql-tag"
import { graphql } from "react-apollo"

class SongCreate extends Component{
	constructor(props){
		super(props)
		this.state = { title: ''}
	}

	onSubmit(event){
		event.preventDefault()
	}

	render(){
		return(
				<div className="song-create">
					<h3>Create a new song</h3>
					<form onSubmit={this.onSubmit.bind(this)}>
						<label htmlFor="">Song Title:</label>
						<input type="text" value={this.state.title} onChange={event => this.setState({title: event.target.value})} />
					</form>
				</div>
			)
	}
}

// it may be worth considering to refactor gql queries / mutations into a separate file
const mutation = gql`
	mutation{
	  addSong(title: "Cool song"){
	    id
	   	title
	  }
	}
`

export default graphql(mutation)(SongCreate);