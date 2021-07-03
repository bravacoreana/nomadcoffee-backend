import { gql } from "apollo-server-express";

export default gql`
  type Query {
    searchCoffeeShop(keyword: String!, offset: Int): [CoffeeShop]
    searchShopName(keyword: String!, offset: Int): [CoffeeShop]
    # searchCategories(keyword: String!, offset: Int): [CoffeeShop]
  }
`;
