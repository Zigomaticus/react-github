import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import PostItem from "./PostItem";

function PostList({ posts, title, removePost }) {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Posts not found!</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem removePost={removePost} number={index + 1} post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default PostList;
