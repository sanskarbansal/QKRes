import React from "react";
import Post from "./Post";

export default function PostList({ posts, user: { id } }: any) {
    return (
        <div className="posts--container">
            {posts.map((post: any) => (
                <Post post={post} key={post.id} self={id === post.user.id} />
            ))}
        </div>
    );
}
