# GraphQL Tutorial from https://www.youtube.com/watch?v=bX2e4FILf78

### Stack

Front End
- React
- Apollo (a GraphQL client that allows us to connect GraphQL with React)

Backend
- Express.js
- GraphQL
- Lodash

Database
- MongoDB Atlas

Testing
- GraphiQL

Sample query:

{
    book{
        name
        genre
        author{
            name
            age
        }
    }
}

returns an object "data" that holds an object, books, which holds an array of data 

STEPS

To run backend:

node app

To test API in graphiql, add the following to middleware – graphiql: true

