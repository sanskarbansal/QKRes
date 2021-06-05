import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(data: { email: $email, password: $password }) {
            username
            email
            id
        }
    }
`;

export const REGISTER_USER = gql`
    mutation register($email: String!, $username: String!, $password: String!) {
        register(data: { email: $email, username: $username, password: $password }) {
            username
            id
            email
        }
    }
`;
export const CREATE_POST = gql`
    mutation createpost($title: String!) {
        createPost(title: $title) {
            id
            title
            user {
                username
            }
            date
        }
    }
`;
