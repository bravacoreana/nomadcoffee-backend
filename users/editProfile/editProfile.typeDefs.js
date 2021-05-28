import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editProfile(
      username: String
      email: String
      name: String
      password: String
      location: String
      avatarUrl: Upload
      githubUsername: String
    ): MutationResponse!
  }
`;
