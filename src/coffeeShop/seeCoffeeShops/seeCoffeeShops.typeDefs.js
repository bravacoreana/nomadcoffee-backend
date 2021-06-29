import { gql } from "apollo-server-core";

export default gql`
  type seeCoffeeShopResult {
    shops: [CoffeeShop]
    lastPage: Int!
    shopsCount: Int!
  }
  type Query {
    # seeCoffeeShops(page: Int): [CoffeeShop]
    seeCoffeeShops(page: Int): seeCoffeeShopResult!
  }
`;
