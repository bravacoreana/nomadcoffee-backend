import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeCategories(page: Int!): MutationResponse!
  }
`;
