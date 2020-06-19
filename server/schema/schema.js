const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID // allows us to pass either int or string in query
} = graphql;

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({ // RootQuery: how we initially jump into the graph
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){ // this function fires when 'book' is seen in a query
                // code to get data from db / other source
                return _.find(books, { id: args.id }); //  use lodash to look thru books array and find id of args.id
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery // options: which query the FE is allowed to use
});