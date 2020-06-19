const express = require('express');
const graphqlHTTP = require('express-graphql'); // provides simple way to create express server that runs graphql API by using middleware on a single route

const app = express();

app.use('/graphql', graphqlHTTP({
    // will pass in options 
}));

app.listen(4000, () => {
    console.log("now listening to all requests on port 4000");
});

