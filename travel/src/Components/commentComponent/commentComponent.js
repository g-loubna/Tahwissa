import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./commentComponentStyle.css"
import publisher from './publisher.png'
import share from './share.png'
import like from './like.png'
function CommentComponent({ 
  userName = "User Name",
  publishDate = "publish date",
  views = "0 views",
  likes = "0 likes",
  thePostTitle = "The Post Title",
  theCommentText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
}){
  return (
    <>  
      <div className="commentComponent">
        <p></p>
        <span className="span">sssssssssss</span>
        <img className="publisher" src={publisher}/>
        <span className="span">ss</span>
        <span className="publisherName">{userName}</span>
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
        <p className="postText">{theCommentText}</p>
      </div>
    </> 
  );
}

export default CommentComponent;
