import React from "react";

export default function Post({ post, lazy }: any) {
    console.log(post);

    return (
        <div className={`posts--container__post ${lazy && "lazy"}`}>
            <div>
                <h1>{post && post.user.username}</h1>
                <span>{post && post.date}</span>
            </div>
            <p>{post && post.title}</p>
        </div>
    );
}
