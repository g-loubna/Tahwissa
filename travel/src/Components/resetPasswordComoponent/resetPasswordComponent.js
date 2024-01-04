import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useGoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import {gapi} from 'gapi-script'
import axios from 'axios';
import "./resetPassword.css"
function ResetPassword() {
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [alertM, setAlert] = useState('');
  const [login, setLogin] = useState('reset password');
  const [inputValue0, setInputValue0] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [password0, setPassword0] = useState('');
  const [password1, setPassword1] = useState('');
  const [validName, setValidName] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  
  const handleClick_ = () => {
    if (passwordsMatch) {
      
      const dataToSend = {
        password: password1
      };
      setAlert("le mot de passe est envoyé")
      console.log(dataToSend)
      axios.post("http://localhost:4000/auth/login", dataToSend)
        .then(response => {
          // 
          console.log('Response from server:', response.data);
        })
        .catch(error => {
          // setLogin("reset password")
          console.error('Error sending data:', error);
        });
    } 
    if(login == "reset password"){
      
    }
  };
  const handlePasswordChange0 = (event) => {
    const newPassword = event.target.value;
    setPassword0(newPassword);
    if (newPassword.length < 8){
      setAlert("le mot de passe doit etre au moins de 8 caracteres")
    }
    if(!containsNumber(newPassword)){
      setAlert("le mot de passe doit contenir un nombre")
    }
    if(containsSpace(newPassword)){
      setAlert("le mot de passe ne doit pas contenir un espace")
    }
    
    if(password0.length >= 8 && containsNumber(password0) && !containsSpace(password0)){
      setAlert("");
    } 
    
  };
  const containsNumber = (value) => {
    const numbers = '0123456789';
    for (const char of value) {
      if (numbers.includes(char)) {
        return true;
      }
    }
    return false;
  };

  const containsSpace = (value) => {
    return value.includes(' ');
  };

  const handlePasswordChange1 = (e) => {
  const newPassword = e.target.value;
  setPassword1(newPassword);
  setPasswordsMatch(password0 === newPassword);
  
  if (password0 === newPassword) {
    setAlert("Passwords match!");
  } else {
    setAlert("Passwords do not match.");
  }
};
  const containsSpecialCharacters = (value) => {
    const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', ';', ':', '<', '>', ',', '.', '/', '?', '|', '\\', '`', "'",'~'];

    for (const char of value) {
      if (specialCharacters.includes(char)) {
        return true;
      }
    }

    return false;
  };
  return (
    <>  
      <div className="signInSpace1_">
        <p className="signInText_">Reset Password</p><span className="alert">     {alertM}</span>
        <input
          className="emailInput__"
          type="password"
          value={password0}
          onChange={handlePasswordChange0}
          placeholder="   Entrer le mot de passe"
        />
        <input
          className="passwordInput__"
          type="password"
          value={password1}
          onChange={handlePasswordChange1}
          placeholder="   Reentrer le mot de passe"
        />
        <div className="hiddingElement_">s</div>
        <span className="hiddingElement2_">ssssssssssssssssssssssss</span>
        <button className="signInButton_" onClick={handleClick_}>{login}</button>
        
        
        <div className="hiddingElement3_">s</div>
        <div className="hiddingElement3_">s</div>
        <div className="hiddingElement3_">s</div>
        <span className="hiddingElement4_">ssssssss</span>
        <span className="dontHavingAnAccountText_">Mot de passe Mémorisé </span>
        <span className="hiddingElement4_">sssssss</span>
        <Link className="createNewOneText_" to="/">Revenir</Link>
      </div>
    </> 
  );
}

export default ResetPassword;
