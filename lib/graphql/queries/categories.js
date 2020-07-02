import { gql } from 'apollo-boost';

export const GET_CATEGORIES = gql`
  {
    categories(sort: "createdAt:asc") {
      name
    }
  }
`;
