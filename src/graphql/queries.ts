import { gql } from "@apollo/client";

export const LOAD_POSTS = gql`
    query {
        getPosts {
            id
            title
            user {
                username
                email
                id
            }
            date
        }
    }
`;
export const ME = gql`
    query {
        Me {
            username
            id
            email
        }
    }
`;
// export const F = gql`
//     query {
//         Me {
//             username
//             id
//             email
//         }
//     }
// `;
