import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeCoffeeShop(id: Int!): CoffeeShop
  }
`;
