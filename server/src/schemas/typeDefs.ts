import gql from "graphql-tag";

const typeDefs = gql`
type User{
    _id: ID
    username: String
    email: String
    password: String
    saveBooks: [Book]!
    bookCount: Int
}
type Book{
    bookId: String!
    title: String!
    authors: [String]!
    description: String!
    image: String!
    # link: String!
}
input UserInput{
    username:String!
    email:String!
    password:String!
}
input SaveBook{
    authors:[String]!
    description:String!
    bookId:String!
    image:String!
    # link:String!
    title:String!
}
type Auth{
    token:ID!  #should this be ID! or string
    user:User
}
type Query{
    me:User
}
type Mutation{
    login(email:String!, password:String!):Auth
    addUser(input: UserInput!):Auth
    saveBook(input: SaveBook!):User
    removeBook(bookId:String!):User
}
`;

export default typeDefs;
