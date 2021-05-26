import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    avatarUrl: String
    githubUsername: String
    createdAt: String!
    updatedAt: String!
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      password: String!
    ): MutationResponse!
  }

  type Query {
    users: [User]
    user(id: Int!): User
  }
`;
