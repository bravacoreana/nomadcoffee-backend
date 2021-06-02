import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeCoffeeShops(page: Int!): [CoffeeShop]
  }
`;
