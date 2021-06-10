import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String!
      longitude: String!
      photos: [Upload]
      categories: [String]
    ): MutationResponse!
  }
`;
