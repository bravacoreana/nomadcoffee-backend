import { gql } from "apollo-server-express";

export default gql`
  type Query {
    userCoffeeShops(id: Int!, offset: Int!): [CoffeeShop]
  }
`;
