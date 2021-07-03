import { gql } from "apollo-server-express";

export default gql`
  type Query {
    searchCategories(keyword: String!, offset: Int): [Category]
  }
`;
