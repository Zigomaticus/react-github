import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PostService from "../components/API/PostService";
import Loader from "../components/UI/Loader/Loader";

import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isComLoadin, comError] = useFetching(async (id) => {
    const res = await PostService.getById(id);
    setPost(res.data);
  });

  const [fetchComments, isLoadin, error] = useFetching(async (id) => {
    const res = await PostService.getCommentsByPostId(id);
    setComments(res.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1>You open the page with ID = {params.id}</h1>
      {isLoadin ? (
        <Loader />
      ) : (
        <div>
          {post.id}.{post.title}
        </div>
      )}
      <h1>Comments</h1>
      {isComLoadin ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comment) => (
            <div style={{ matginTop: "15px" }}>
              <h5>{comment.email}</h5>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
