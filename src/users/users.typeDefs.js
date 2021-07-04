import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    avatar: String
    bio: String
    githubUsername: String
    isMe: Boolean!
    isFollowing: Boolean!
    shops: [CoffeeShop]
    totalFollowing: Int!
    totalFollowers: Int!
    createdAt: String!
    updatedAt: String!
    following: [User]
    followers: [User]
  }
`;
