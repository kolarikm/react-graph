import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../Queries/queries';

import BookDetail from './BookDetail';

class BookList extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            selected: null // Currently selected book
        }
    }

    displayBooks() {
        let data = this.props.data;

        if (!data.loading) {
            return data.books.map(book => {
                return <li key={book.id} onClick={ (e) => {this.setState({ selected: book.id })} }>{book.name}</li>
            })
        }
    }
    
    render() {
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <BookDetail bookId={this.state.selected}/>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
