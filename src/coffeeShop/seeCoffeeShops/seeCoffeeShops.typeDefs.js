import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeCoffeeShops(offset: Int): [CoffeeShop]
  }
`;
// type seeCoffeeShopResult {
//   shops: [CoffeeShop]
//   lastPage: Int!
//   shopsCount: Int!
// }
// seeCoffeeShops(page: Int, offset: Int): seeCoffeeShopResult!
