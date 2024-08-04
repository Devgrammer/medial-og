import React, { useState, useEffect } from "react";

const PostPage = ({ post }) => {
  const [ogImageUrl, setOgImageUrl] = useState("");

  useEffect(() => {
    const fetchOgImageUrl = async () => {
      try {
        const response = await fetch(
          `https://comforting-genie-7cab99.netlify.app/.netlify/functions/generate-og-image`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: post.title,
              content: post.content,
              image: post.image || "",
            }),
          }
        );

        if (response.ok) {
          const { url } = await response.json();
          setOgImageUrl(url);
        } else {
          console.error("Error fetching OG image URL:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOgImageUrl();
  }, [post]);

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
