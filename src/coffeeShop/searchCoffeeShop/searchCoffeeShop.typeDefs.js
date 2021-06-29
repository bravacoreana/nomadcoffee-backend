import { gql } from "apollo-server-express";

export default gql`
  type Query {
    searchCoffeeShop(keyword: String!, page: Int): [CoffeeShop]
    searchShopName(keyword: String!, page: Int): [CoffeeShop]
    searchCategories(keyword: String!, page: Int): [CoffeeShop]
  }
`;
