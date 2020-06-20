import React from 'react';
import { gql } from 'apollo-boost'; // gql will parse our graphql query
import { graphql } from 'react-apollo'; // binds apollo to react

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

function BookList(props) {
  console.log("props: ", props);
  return (
    <div>
        <ul id="book-list">
            <li>Book name</li>
        </ul>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList); // use graphql to bind query to component, where data from returned query is stored in props