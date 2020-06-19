const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({ // RootQuery: how we initially jump into the graph
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){ // this function fires when 'book' is seen in a query
                // code to get data from db / other source
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery // options: which query the FE is allowed to use
});