const express = require('express');
const graphqlHTTP = require('express-graphql'); // provides simple way to create express server that runs graphql API by using middleware on a single route
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
    'mongodb+srv://eloise:test123@graphql-tutorial-bnc1c.mongodb.net/test', 
    { useNewUrlParser: true, // this object added due to mongoose Server Discovery and Monitoring engine deprecation warning
      useUnifiedTopology: true
    } 
); 

mongoose.connection.once('open', () => {
    console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({ // middleware
    schema,
    graphiql: true // use graphiql tool when /graphql is hit

}));

app.listen(4000, () => {
    console.log("now listening to all requests on port 4000");
});

