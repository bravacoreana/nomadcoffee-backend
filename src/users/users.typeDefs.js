import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    avatar: String
    githubUsername: String
    createdAt: String!
    updatedAt: String!
    following(page: Int!): [User]
    followers(page: Int!): [User]
  }
`;