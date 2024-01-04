import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./PostComponentStyle.css"
import publisher from './publisher.png'
import share from './share.png'
import like from './like.png'
function PostComponent({ 
  publisherName = "Publisher Name",
  publishDate = "publish date",
  views = "0 views",
  likes = "0 likes",
  thePostTitle = "The Post Title",
  thePostText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
}) {

  const postData = {
    publisherName: "Publisher Name",
    publishDate: "publish date",
    views: "0 views",
    likes: "0 likes",
    thePostTitle: "The Post Title",
    thePostText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  };
  return (
    <>  
      <div className="postComponent">
        <p></p>
        <span className="span">sssssssssss</span>
        <img className="publisher" src={publisher}/>
        <span className="span">ss</span>
        <span className="publisherName">{publisherName}</span>
        <span className="span">ss</span>
        <span className="publishDate">{publishDate}</span>
        <span className="span">ss</span>
        <span className="views">{views}</span>
        <span className="span">ss</span>
        <span className="likes">{likes}</span>
        <span className="span">sssssssssssssssss</span>
        <button className="share" ></button>
        <span className="span">ss</span>
        <button className="like" ></button>
        <p></p>
        <span className="span">ssssssssssssss</span>
        <span className="postTitle">{thePostTitle}</span>
        <p className="postText">{thePostText}</p>
        <span className="span">ssssssssssssss</span>
        <Link className="viewMore" to={{pathname:"/DetailedPostComponent"}}>sssssssssssssssss</Link>
        <div></div>
        <span className="span">ssssssssssssss</span>
        <Link className="commentsButton" to="/CommentsPage">ssssssssssssssssss</Link>
      </div>
    </> 
  );
}

export default PostComponent;
