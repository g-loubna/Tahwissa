import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./detailedPostComponentStyle.css"
import publisher from './publisher.png'
import share from './share.png'
import like from './like.png'
function DetailedPostComponent({ 
  publisherName = "Publisher Name",
  publishDate = "publish date",
  views = "0 views",
  likes = "0 likes",
  thePostTitle = "The Post Title",
  thePostText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
}) {
  
  return (
    <>  
      <div className="detailedPostComponent">
        <p></p>
        <span className="span">sssssssssss</span>
        <img className="publisher" src={publisher}/>
        <span className="span">ss</span>
        <span className="publisherName">{publisherName}</span>
        <span className="span">ss</span>
        <span className="publishDate">{publishDate}</span>
        
        <span className="span">sssssssssssssssssssssssssssssss</span>
        <button className="share" ></button>
        <span className="span">ss</span>
        <button className="like" ></button>
        <span className="span">ss</span>
        <button className="delete" ></button>
        <p></p>
        <span className="span">ssssssssssssss</span>
        <span className="postTitle">{thePostTitle}</span>
        <span className="span">sssssssssssssssssssssssssssssssssss</span>
        <span className="views">{views}</span>
        <span className="span">ss</span>
        <span className="likes">{likes}</span>
        <p></p>
        <img className="postImage" src=""/>
        <p className="postText">{thePostText}</p>
        
      </div>
    </> 
  );
}

export default DetailedPostComponent;
