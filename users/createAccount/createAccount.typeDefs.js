import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      password: String!
      avatar: String
      location: String
      githubUsername: String
    ): MutationResponse!
  }
`;
