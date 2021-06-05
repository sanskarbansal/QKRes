import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(data: { email: $email, password: $password }) {
            username
            posts {
                title
            }
        }
    }
`;

export const REGISTER_USER = gql`
    mutation register($email: String!, $username: String!, $password: String!) {
        register(data: { email: $email, username: $username, password: $password }) {
            username
        }
    }
`;
