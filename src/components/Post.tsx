import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../graphql/mutations";
export default function Post({ post, lazy, self }: any) {
    const [deletePost, { loading, error, data }] = useMutation(DELETE_POST);
    const handleDelete = async () => {
        await deletePost({ variables: { pId: post.id } });
        console.log(data);
    };

    return (
        <div className={`posts--container__post ${lazy && "lazy"}`}>
            <div>
                <h1>{post && post.user.username}</h1>
                {self && (
                    <button onClick={handleDelete} className="btn">
                        DELETE
                    </button>
                )}
                <span>{post && post.date}</span>
            </div>
            <p>{post && post.title}</p>
        </div>
    );
}
