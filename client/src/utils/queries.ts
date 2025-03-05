import { gql } from "@apollo/client";

export const QUERY_ME = gql`
query Me {
  me {
    username
    email
    password
    saveBooks {
      bookId
      title
      authors
      description
      image
    }
  }
}
`;
