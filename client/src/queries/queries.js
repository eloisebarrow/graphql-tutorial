import { gql } from 'apollo-boost'; // gql will parse our graphql query

export const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`

export const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

export const addBookMutation = gql`
    mutation {
        addBook(name: "", genre: "", authorId: ""){
            name
            id
        }
    }
`