import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./freindPostsPageStyle.css";
import PostComponent from './../postComponent/postComponent.js';

function FreindPostsPage() {
  const [posts, setPosts] = useState([]);
  const [publisherName, setPublisherName] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [views, setViews] = useState("");
  const [likes, setLikes] = useState("");
  const [thePostTitle, setThePostTitle] = useState("");
  const [thePostText, setThePostText] = useState("");

  useEffect(() => {
    axios.get('http://localhost:4000/posts')
      .then(response => {
        setPosts(response.data);
        setPublishDate(response.data.createdAt)
        console.log(response.data.createdAt)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="freindPostsPage">
      <p className="freindPostsText">Friend Posts</p>
      {posts.map(post => (
        <PostComponent
          key={post.id}  // Assuming there is an "id" property in your data
          publisherName={post.publisherName}
          publishDate={post.createdAt.substring(0,10)}
          views={post.views}
          likes={post.like}
          thePostTitle={post.content}
          thePostText={post.thePostText}
        />
      ))}
    </div>
  );
}

export default FreindPostsPage;
