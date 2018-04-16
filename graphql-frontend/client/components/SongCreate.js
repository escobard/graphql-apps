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
		console.log(this.props)
		console.log(this.state)
		// this expects an object with the variables that need to be passed into the mutation
		this.props.mutate({
			variables:{

				// sets the variable values to the mutation, in this case the defined $title: String
				title: this.state.title
			}
		})
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
// adding this to the graphQL higher order component adds the mutation to this.props.varName
const mutation = gql`
	mutation AddSong($title: String){
		addSong(title: $title){
			title
		}
	}
`

export default graphql(mutation)(SongCreate);