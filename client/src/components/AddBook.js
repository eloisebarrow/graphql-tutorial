import React, { useState } from 'react';
import { graphql } from 'react-apollo'; // binds apollo to react
import {flowRight as compose} from 'lodash'; // allows us to export multiple queries and bind them to the component
import { getAuthorsQuery } from '../queries/queries';
import { getBooksQuery } from '../queries/queries';
import { addBookMutation } from '../queries/queries';

function AddBook(props) {

    let [ name, setName ] = useState(null);
    let [ genre, setGenre ] = useState(null);
    let [ authorId, setAuthorId ] = useState(null);

    const displayAuthors = () => {
        var data = props.getAuthorsQuery;
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

    const submitForm = (e) => {
        e.preventDefault();
        props.addBookMutation({
            variables: {
                name,
                genre,
                authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }

    return (
    <form id="add-book" onSubmit={ (e) => submitForm(e) }>
        <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={ (e) => setName(e.target.value) } />
        </div>

        <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={ (e) => setGenre(e.target.value) }/>
        </div>

        <div className="field">
            <label>Author:</label>
            <select onChange={ (e) => setAuthorId(e.target.value) }>
                <option>Select author</option>
                { displayAuthors() }
            </select>
        </div>

        <button>+</button>

    </form>
    );
}

// use compose & graphql to bind multiple queries to component, where data from returned query is stored in props
export default compose (
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook); 