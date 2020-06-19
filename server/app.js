const express = require('express');
const graphqlHTTP = require('express-graphql'); // provides simple way to create express server that runs graphql API by using middleware on a single route
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({ // middleware
    schema,
    graphiql: true // use graphiql tool when /graphql is hit

}));

app.listen(4000, () => {
    console.log("now listening to all requests on port 4000");
});

