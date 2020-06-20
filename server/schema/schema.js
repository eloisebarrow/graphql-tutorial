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
    GraphQLList,
    GraphQLNonNull // makes any field wrapped with it required
} = graphql;

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
                return Author.findById(parent.authorId);
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
                return Book.find({ authorId: parent.id });
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
                return Book.findById(args.id);
            }
        },
        author: { // single author
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Author.findById(args.id);
            }
        },
        books: { // all books
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({});
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
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let author = new Author({ // can do because we imported Author model above
                    name: args.name,
                    age: args.age
                });
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args){
                let book = new Book({ // can do because we imported Book model above
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save()
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery, // options: which query the FE is allowed to use
    mutation: Mutation
});