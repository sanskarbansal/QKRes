import React, { useState, useEffect, useContext } from "react";
import { useDeletePostMutation, useEditPostMutation } from "../generated/graphql";
import { DashboardContext } from "./DashboardContext";

export default function Post({ post, lazy, self }: any) {
    const [deletePost, { data: deletedPostData }] = useDeletePostMutation();
    const [updatePost] = useEditPostMutation();
    const [isEditing, setisEditing] = useState(false);
    const [postTitle, setpostTitle] = useState(post?.title);
    const { deletePost: deletePostClient } = useContext(DashboardContext);

    const handleDelete = () => {
        deletePost({ variables: { pId: post.id } });
    };

    useEffect(() => {
        if (deletedPostData && deletedPostData.deletePost.success && post) {
            deletePostClient(post.id);
        }
    }, [deletedPostData, post, deletePostClient]);

    useEffect(() => {}, [isEditing]);
    const handleEdit = (event: any) => {
        if (isEditing) {
            updatePost({ variables: { pid: post.id, title: postTitle } });
        }
        setisEditing(!isEditing);
    };
    return (
        <div className={`posts--container__post ${lazy ? "lazy" : ""}`}>
            <div>
                <h1>{post && post.user.username}</h1>
                {self && (
                    <>
                        <button onClick={handleEdit} className="btn btn__edit">
                            {!isEditing ? "Edit" : "Update"}
                        </button>
                        {isEditing && (
                            <button className="btn btn__edit" onClick={() => setisEditing(false)}>
                                Cancel
                            </button>
                        )}
                        <button onClick={handleDelete} className="btn btn__edit">
                            DELETE
                        </button>
                    </>
                )}
                <span>{post && post.date}</span>
            </div>
            {isEditing && <input value={postTitle} onChange={(e) => setpostTitle(e.target.value)} style={{ width: "80%" }} type="text" />}

            {!isEditing && <p>{postTitle && postTitle}</p>}
        </div>
    );
}
