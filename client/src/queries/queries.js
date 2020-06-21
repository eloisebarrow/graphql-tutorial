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
// '!' below means those variables are required
export const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) { 
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`

export const getBookQuery = gql`
    query($id: ID){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`