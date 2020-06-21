import React from 'react';
import { graphql } from 'react-apollo'; // binds apollo to react
import { getBooksQuery } from '../queries/queries';

// components
import BookDetails from './BookDetails';

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
        <BookDetails />
    </div>
  );
}

// use graphql to bind query getBooksQuery to component, where data from returned query is stored in props
export default graphql(getBooksQuery)(BookList); 