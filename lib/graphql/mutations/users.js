import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
  mutation User($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      user {
        username
      }
    }
  }
`;
