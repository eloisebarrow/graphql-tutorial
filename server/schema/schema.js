const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book'); // book model
const Author = require('../models/author'); // author model

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID, // allows us to pass either int or string in query
    GraphQLInt,
    GraphQLList
} = graphql;

// dummy data
// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//     { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' }
// ];

// var authors = [
//     { name: 'Patrick Rothfuss', age: 44, id: '1' },
//     { name: 'Brandon Sanderson', age: 42, id: '2' },
//     { name: 'Terry Pratchett', age: 66, id: '3' }
// ]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({ // fields must be wrapped in a function otherwise JS will not know what AuthorType is (and vice versa if order of code is switched)
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { // associate author with each book
            type: AuthorType, // single AuthorType associated with each book
            resolve(parent, args){
                console.log(parent);
                // return _.find(authors, { id: parent.authorId })
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return _.filter(books, {authorId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({ // RootQuery: how we initially jump into the graph
    name: 'RootQueryType',
    fields: {
        book: { // single book
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){ // this function fires when 'book' is seen in a query
                // code to get data from db / other source
                // return _.find(books, { id: args.id }); //  use lodash to look thru books array and find id of args.id
            }
        },
        author: { // single author
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // return _.find(authors, { id: args.id });
            }
        },
        books: { // all books
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({ // change the data in some way
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save()
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery, // options: which query the FE is allowed to use
    mutation: Mutation
});