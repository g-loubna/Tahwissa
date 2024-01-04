import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./commentsPageComponentStyle.css"
import CommentComponent from './../commentComponent/commentComponent.js';
function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [views, setViews] = useState("");
  const [likes, setLikes] = useState("");
  const [thePostTitle, setThePostTitle] = useState("");
  const [theCommentText, setTheCommentText] = useState("");
  const [commentText, setCommentText] = useState('');

  const handleSendComment = () => {
    if (commentText.trim() !== '') {
      
      alert(commentText)
    }
  };
  const handleComment = (e) => {
    setCommentText(e.target.value)
  }
  /*useEffect(() => {
    axios.get('http://localhost:4000/comments')
      .then(response => {
        setComments(response.data);
        setPublishDate(response.data.createdAt)
        console.log(response.data.createdAt)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);*/
  return (
    <>  
      <div className="CommentsPage">
        <p className="commentsText">Comments</p>
        <span className="hidetext">ss</span>
        <input className="commentInput" onChange={handleComment} type="text" placeholder="   Add Your Comment"/>
        <span className="hidetext">sssssssss</span>
        <button className="sendComment" onClick={handleSendComment}/>
        <CommentComponent/><CommentComponent/><CommentComponent/><CommentComponent/>
        /*{comments.map(comment => (
        <CommentComponent
          key={comment.id}  // Assuming there is an "id" property in your data
          userName={comment.publisherName}
          publishDate={comment.createdAt.substring(0,10)}
          views={comment.views}
          likes={comment.like}
          theCommentText={comment.thePostText}
        />
      ))}*/
        
      </div>
    </> 
  );
}

export default CommentsPage;
