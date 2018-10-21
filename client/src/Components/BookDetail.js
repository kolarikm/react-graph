import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getBookQuery, removeBookMutation, getBooksQuery } from '../Queries/queries';

class BookDetail extends Component {

    removeBook() {
        this.props.removeBookMutation({
            variables: {
                id: this.props.bookId
            },
            refetchQueries: [{ query: getBooksQuery }]
        }).then(() => {
            this.props.handleRemove();
        });
    }
    
    displayBookDetails() {
        const { book } = this.props.data;
        if (book) {
            return (
                <div>
                    <h3 onClick={ this.removeBook.bind(this) }>{book.name}</h3>
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
        } else {
            return (
                <div><h3>No book selected</h3></div>
            )
        }
    }

    render() {
        return (
            <div id="book-detail">
                <br />
                {this.displayBookDetails()}
            </div>
        );
    }
}

export default compose(
    graphql(getBookQuery, {
        options: (props) => {
            return {
                variables: {
                    id: props.bookId
                }
            }
        }
    }),
    graphql(removeBookMutation, {
        name: "removeBookMutation",
        options: (props) => {
            return {
                variables: {
                    id: props.bookId
                }
            }
        }
    })
)(BookDetail);
