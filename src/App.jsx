
import PostPage from "./PostPage";

const App = () => {
  // Example post data
  const post = {
    title: "Sample Post Title",
    content: "This is a snippet of the post content that will be displayed.",
    image:"https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg",
  };

  return (
    <div className="App">
      <PostPage post={post} />
    </div>
  );
};

export default App;
