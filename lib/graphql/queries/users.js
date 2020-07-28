import { gql } from 'apollo-boost';

export const CURRENT_USER = `
  query {
    me {
      email
      username
    }
  }
`;
