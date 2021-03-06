const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const books = [
    {id: "1", authorId: "1", name: 'The Name of the Wind', genre: 'Fantasy'},
    {id: "2", authorId: "2", name: 'Words of Radiance', genre: 'Fantasy'},
    {id: "3", authorId: "3", name: 'Red Rising', genre: 'Sci-Fi'},
    {id: "4", authorId: "2", name: 'The Way of Kings', genre: 'Fantasy'},
    {id: "5", authorId: "2", name: 'Well of Ascension', genre: 'Fantasy'},
    {id: "6", authorId: "3", name: 'Morningstar', genre: 'Sci-Fi'},
    {id: "7", authorId: "1", name: 'Wise Men Fear', genre: 'Fantasy'},
];

const authors = [
    {id: "1", name: 'Patrick Rothfuss', age: 44},
    {id: "2", name: 'Brandon Sanderson', age: 42},
    {id: "3", name: 'Pierce Brown', age: 30}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId })
            }
        },
        similar: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(book => book.id !== parent.id && book.genre === parent.genre)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return _.find(authors, { id: args. id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
