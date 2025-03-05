import { gql } from "@apollo/client";

export const ADD_USER = gql`
  #how come we can just pass User as a interface type?
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        # is this where data gets returned from the server?
        username
        _id
      }
    }
  }
`;
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        _id
      }
    }
  }
`;
export const SAVE_BOOK = gql`
  mutation saveBook($input: SaveBook!) {
    saveBook(input: $input) {
        _id
        username
      saveBooks{  
        authors
        description
        title
        bookId
        image
        # link
      }
    }
  }
`;
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!){
    removeBook(bookId: $bookId){
    _id
    username
      saveBooks{  
        authors
        description
        title
        bookId
        image
        # link
      }
        }
    }
`;
