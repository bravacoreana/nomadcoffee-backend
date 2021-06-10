import { gql } from "apollo-server-core";

export default gql`
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop!
    createdAt: String!
    updatedAt: String!
  }
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String!
    longitude: String!
    user: User!
    isMine: Boolean!
    photos: [CoffeeShopPhoto]
    categories: [Category]
    createdAt: String!
    updatedAt: String!
  }
`;
