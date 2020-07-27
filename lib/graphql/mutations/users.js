import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
  mutation User($username: String!, $email: String!, $password: String!) {
    signup(input: { username: $username, email: $email, password: $password }) {
      isAuthenticated
      user {
        email
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation User($email: String!, $password: String!) {
    signin(
      input: { password: $password, identifier: $email, provider: "local" }
    ) {
      isAuthenticated
      user {
        email
        username
      }
    }
  }
`;
