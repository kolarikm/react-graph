import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBookQuery } from '../Queries/queries';

class BookDetail extends Component {

    displayBookDetails() {
        const { book } = this.props.data;

        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>Other works: </p>
                    <ul className="other-works">
                        {book.author.books.map(book => {
                            return <li key={book.id}>{book.name}</li>
                        })}
                    </ul>
                </div>
            )
        }
    }

    render() {
        return (
            <div id="book-detail">
                {this.displayBookDetails()}
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetail);
