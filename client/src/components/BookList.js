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
  const displayBooks = () => {
    var data = props.data;
    if (data.loading){
      return ( <div>Loading Books...</div> )
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id}>
            {book.name}
          </li>
        )
      })
    }
  }

  return (
    <div>
        <ul id="book-list">
          { displayBooks() }
        </ul>
    </div>
  );
}

// use graphql to bind query getBooksQuery to component, where data from returned query is stored in props
export default graphql(getBooksQuery)(BookList); 