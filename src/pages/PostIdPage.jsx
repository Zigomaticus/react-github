import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PostService from "../components/API/PostService";
import Loader from "../components/UI/Loader/Loader";

import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});

  const [fetchPostById, isLoadin, error] = useFetching(async (id) => {
    const res = await PostService.getById(id);
    setPost(res.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
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
    </div>
  );
};

export default PostIdPage;
