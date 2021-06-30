import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeShopLikes(id: Int!): [User]
  }
`;
