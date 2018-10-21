import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../Queries/queries';

class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }
    
    displayAuthors() {
        let data = this.props.getAuthorsQuery;
        if (!data.loading){ 
            return data.authors.map(author => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            });
        }
    }

    submitForm(e) {
        e.preventDefault();

        //TODO: Add validation on fields

        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }

    render() {
        return (
            <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
                
                <div className="field">
                    <label>Book Name: </label>
                    <input type="text" 
                           onChange={ (e) => this.setState({ name: e.target.value }) } 
                    />
                </div>

                <div className="field">
                    <label>Genre: </label>
                    <input type="text"
                           onChange={ (e) => this.setState({ genre: e.target.value }) } 
                    />
                </div>

                <div className="field">
                    <label>Author: </label>
                    <select value={this.state.authorId} onChange={ (e) => this.setState({ authorId: e.target.value }) } >
                        <option value="">---</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>

            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
