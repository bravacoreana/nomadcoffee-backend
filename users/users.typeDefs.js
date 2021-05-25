import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
    user(id: Int!): User
  }
`;
