import { gql } from 'apollo-boost';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`

const removeBookMutation = gql`
    mutation($id: String!) {
        removeBook(id: $id) {
            name
            id
        }
    }
`

const getBookQuery = gql`
    query($id: ID) {
        book(id: $id) {
            name
            id
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`

export { getBooksQuery, getAuthorsQuery, addBookMutation, removeBookMutation, getBookQuery }
