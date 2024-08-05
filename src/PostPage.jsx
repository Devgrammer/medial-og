import React, { useState } from "react";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const postData = {
      title,
      content,
      image,
    };

    try {
      const response = await fetch(
        "https://comforting-genie-7cab99.netlify.app/.netlify/functions/generate-og-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setGeneratedImageUrl(imageUrl);
    } catch (error) {
      console.error("Error generating OG image:", error);
      setError("Error generating OG image: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Image URL (optional):
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate OG Image"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {generatedImageUrl && (
        <div>
          <h2>Generated OG Image:</h2>
          <img src={generatedImageUrl} alt="Generated OG" />
        </div>
      )}
    </div>
  );
};

export default PostPage;
