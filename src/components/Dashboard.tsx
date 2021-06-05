import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST, LOGOUT } from "../graphql/mutations";
import { LOAD_POSTS } from "../graphql/queries";
import PostList from "./PostList";
import Post from "./Post";

export default function Dashboard({ user, resetUser }: { resetUser(): void; user: { email: String; username: String; id: String } }) {
    const [title, settitle] = useState("");
    const { username } = user;
    const [createPost, { loading: postCreateLoading, error: postCreateError, data: postCreatedData }] = useMutation(CREATE_POST, { errorPolicy: "all" });
    const [logout] = useMutation(LOGOUT, { errorPolicy: "all" });
    const { loading: postFetchLoading, error: postFetchError, data: postFetchData } = useQuery(LOAD_POSTS);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createPost({ variables: { title } });
    };
    useEffect(() => {
        if (postCreateError?.message) window.alert(postCreateError?.message);
        if (postFetchError?.message) window.alert(postFetchError.message);
    }, [postCreateError, postFetchError]);
    const handleLogout = async () => {
        await logout();
        resetUser();
    };
    return (
        <div className="container">
            <div className="container">
                <h2>{username.toUpperCase()}</h2>
                <button className="btn" style={{ width: "20%" }} onClick={handleLogout}>
                    Logout
                </button>
            </div>
            {postCreateLoading ? (
                <span>Loading...</span>
            ) : (
                <div className="container">
                    <form action="" onSubmit={handleSubmit} className="form--container">
                        <div className="form__field">
                            <label htmlFor="title">Post</label>
                            <textarea rows={10} style={{ flexGrow: 1 }} value={title} onChange={(e) => settitle(e.target.value)} name="title" id="title" />
                        </div>
                        <button className="btn" type="submit">
                            CREATE POST
                        </button>
                    </form>
                </div>
            )}
            {postFetchLoading ? (
                <div className="posts--container">
                    <Post lazy />
                    <Post lazy />
                    <Post lazy />
                </div>
            ) : (
                <PostList user={user} posts={postFetchData.getPosts} />
            )}
        </div>
    );
}