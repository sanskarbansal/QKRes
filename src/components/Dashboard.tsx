import React, { useEffect, useState } from "react";
import { DashboardContext } from "./DashboardContext.js";
import PostList from "./PostList";
import Post from "./Post";
import { useCreatepostMutation, useLoadPostsQuery, useLogoutMutation } from "../generated/graphql";

export default function Dashboard({ user, resetUser }: { resetUser(): void; user: { email: String; username: String; id: String } }) {
    //React State Hooks
    const [title, settitle] = useState("");
    const [posts, setPosts] = useState<any | null>(null);

    //GraphQL
    const [createPost, { loading: postCreateLoading, error: postCreateError, data: createdPostData }] = useCreatepostMutation();
    const [logout] = useLogoutMutation();
    const { loading: postFetchLoading, error: postFetchError, data: postFetchData } = useLoadPostsQuery();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createPost({ variables: { title } });
    };

    //Effect Updates
    useEffect(() => {
        if (createdPostData) {
            setPosts((prevState: any) => [createdPostData.createPost, ...prevState]);
        }
    }, [createdPostData]);

    useEffect(() => {
        if (postCreateError?.message) window.alert(postCreateError?.message);
        if (postFetchError?.message) window.alert(postFetchError.message);
    }, [postCreateError, postFetchError]);
    useEffect(() => {
        if (postFetchData) setPosts(postFetchData?.getPosts);
    }, [postFetchData]);

    //Logout Handler
    const handleLogout = async () => {
        await logout();
        resetUser();
    };
    //Delete Post
    const deletePost = (pid: String) => {
        const afterDeletionPosts = posts?.filter(({ id }: { id: String }) => id !== pid);
        setPosts([...afterDeletionPosts]);
    };
    const contextValue = {
        posts,
        setPosts,
        deletePost,
    };
    const { username } = user;
    return (
        <DashboardContext.Provider value={contextValue}>
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
                {postFetchLoading && (
                    <div className="posts--container">
                        <Post lazy />
                        <Post lazy />
                        <Post lazy />
                    </div>
                )}
                {posts && <PostList user={user} posts={posts} />}
            </div>
        </DashboardContext.Provider>
    );
}
