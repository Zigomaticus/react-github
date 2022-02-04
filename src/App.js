import React, { useState, useMemo } from "react";
import PostFilter from "./components/PostFilter";

import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

import "./styles/App.scss";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Javascript", body: "My fist language" },
    { id: 2, title: "Python", body: "The most populat language" },
    { id: 3, title: "Scalla", body: "Hmmm..." },
  ]);

  const [filter, setFilter] = useState({ sort: "", query: "" });

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query)
    );
  }, [filter.query, sortedPosts]);

  function createPost(newPost) {
    setPosts([...posts, newPost]);
  }

  function removePost(post) {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList
        removePost={removePost}
        posts={sortedAndSearchedPosts}
        title={"List of posts"}
      />
    </div>
  );
}

export default App;