import React, { useState, useEffect } from "react";

const PostPage = ({ post }) => {
  const [ogImageUrl, setOgImageUrl] = useState("");

  useEffect(() => {
    // Construct the URL for the og:image
    const url = `https://your-netlify-site.netlify.app/.netlify/functions/generate-og-image?title=${encodeURIComponent(
      post.title
    )}&content=${encodeURIComponent(post.content)}&image=${encodeURIComponent(
      post.image || ""
    )}`;

    setOgImageUrl(url);
  }, [post]);

  // Update the document head with the OG image URL
  useEffect(() => {
    if (ogImageUrl) {
      const metaTag = document.querySelector('meta[property="og:image"]');
      if (metaTag) {
        metaTag.setAttribute("content", ogImageUrl);
      } else {
        const newMetaTag = document.createElement("meta");
        newMetaTag.setAttribute("property", "og:image");
        newMetaTag.setAttribute("content", ogImageUrl);
        document.head.appendChild(newMetaTag);
      }
    }
  }, [ogImageUrl]);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post Image" />}
    </div>
  );
};

export default PostPage;
