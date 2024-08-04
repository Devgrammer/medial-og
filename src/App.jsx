import React from "react";
import PostPage from "./PostPage";

const App = () => {
  // Example post data
  const post = {
    title: "Sample Post Title",
    content: "This is a snippet of the post content that will be displayed.",
    image: "https://example.com/sample-image.jpg", // Optional
  };

  return (
    <div className="App">
      <PostPage post={post} />
    </div>
  );
};

export default App;
