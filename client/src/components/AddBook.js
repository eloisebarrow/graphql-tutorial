import React from 'react';
import { gql } from 'apollo-boost'; // gql will parse our graphql query
import { graphql } from 'react-apollo'; // binds apollo to react

const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`

function AddBook(props) {

    const displayAuthors = () => {
        var data = props.data;
        if (data.loading) {
            return ( <option disabled>Loading Authors...</option> )
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                )
            })
        }
    }

    return (
    <form id="add-book">
        <div className="field">
            <label>Book name:</label>
            <input type="text" />
        </div>

        <div className="field">
            <label>Genre:</label>
            <input type="text" />
        </div>

        <div className="field">
            <label>Author:</label>
            <select>
                <option>Select author</option>
                { displayAuthors() }
            </select>
        </div>

        <button>+</button>

    </form>
    );
}

// use graphql to bind query to component, where data from returned query is stored in props
export default graphql(getAuthorsQuery)(AddBook); 