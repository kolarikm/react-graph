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

    handleRemove() {
        this.setState({ selected: null });
    }

    displayBooks() {
        let data = this.props.data;

        if (!data.loading) {
            return data.books.map(book => {
                return <div key={book.id} onClick={ (e) => {this.setState({ selected: book.id })} }>
                    - {book.name}
                </div>
            })
        }
    }
    
    render() {
        return (
            <div>
                {this.displayBooks()}
                <BookDetail bookId={this.state.selected} handleRemove={ this.handleRemove.bind(this) }/>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
