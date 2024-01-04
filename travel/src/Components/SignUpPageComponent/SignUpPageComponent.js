import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useGoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import {gapi} from 'gapi-script'
import axios from 'axios';
import "./SignUpPageStyle.css"
function SingUpPage() {
  const [inputValue0, setInputValue0] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [password0, setPassword0] = useState('');
  const [password1, setPassword1] = useState('');
  const [validName, setValidName] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [alertM, setAlert] = useState('');
  
  const handleInputChange1 = (e) => {
    if(!isValidEmailFormat(e.target.value)){
      setAlert("vous devez respecter le format example@email.com")
    }
    setInputValue1(e.target.value);
    if(isValidEmailFormat(e.target.value)){
      setInputValue1(e.target.value);
      setAlert("") 
    }
  };
  const handleDateChange = (event) => {
    setBirthDate(event.target.value);
  };
  const handleClick = () => {
    if(password0.length >= 8 && containsNumber(password0) && !containsSpace(password0) &&(isValidEmailFormat(inputValue1)) && validName && birthDate.length != 0){
      const dataToSend = {
        userName: inputValue0.split(" ").join(""),
        firstName: inputValue0.split(" ")[1],
        lastName: inputValue0.split(" ")[0], 
        email: inputValue1,
        password: password0,
        birthDate: birthDate
      };

      console.log(dataToSend)
      axios.post("http://localhost:4000/auth/register", dataToSend)
        .then(response => {
          // Handle the response from the server
          console.log('Response from server:', response.data);
        })
        .catch(error => {
          // Handle any errors that occurred during the request
          console.error('Error sending data:', error);
        });
        setAlert("success")
    }else {
      setAlert("vous devez remplir tous les champs")
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
  useEffect(()=>{
    function start() {
      gapi.client.init({
        clientId : "",
        scope: ""
      })
    }
    gapi.load("client:auth2",start)
  })
  const navigate = useNavigate();
  const handleGoogleLogin = (response) => {
    console.log('Google Login Response:', response);
    alert("succussefully logged in")
    navigate('/FreindPostsPage');
  };
  const handleGoogleLoginFailure = (error) => {
   console.error('Google Login Failure:', error);
  };
  const { signIn } = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onFailure: handleGoogleLoginFailure,
    clientId: '398229315292-d0dra2tha7c02camgbg1p33d4t8fu3sg.apps.googleusercontent.com', 
  });
  function isValidEmailFormat(inputData) {
  
  if (inputData.includes('@') && inputData.includes('.')) {
   
    const atIndex = inputData.indexOf('@');
    const dotIndex = inputData.lastIndexOf('.');
    
    if (atIndex < dotIndex) {
      
      if (atIndex > 0 && dotIndex < inputData.length - 1) {
        return true;
      }
    }
  }

  return false;
}
  const handleInputChange0 = (e) => {
  const inputValue = e.target.value;
  setInputValue0(inputValue);
  const trimmedValue = inputValue0.trim();
  const words = trimmedValue.split(' ');

  if (words.length !== 2) {
    setAlert('Entrer Deux Mots');
    if(words.length == 1){
      if (containsNumber(words[0])) {
      setAlert('les nombres ne sont pas autorisés');
    } else if (containsSpecialCharacters(words[0]) ) {
      setAlert('les caracteres ne sont autorisées');
    }
    }
  } else if(words.length == 2){
    if (containsNumber(words[0]) || containsNumber(words[1])) {
      setAlert('les nombres ne sont pas autorisés');
    } else if (containsSpecialCharacters(words[0]) || containsSpecialCharacters(words[1])) {
      setAlert('les caracteres ne sont autorisées');
    } else {
      setAlert('');
      setValidName(true)
    }
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
      <div className="signInSpace1">
        <p className="signInText">Sign Up</p><span className="alert">     {alertM}</span>
        <input
          className="fullNameInput"
          type="text"
          value={inputValue0}
          onChange={handleInputChange0}
          placeholder="   Nom Prénom"
        />
        <input
          className="birthDateInput"
          type="date"
          value={birthDate}
          onChange={handleDateChange}
          placeholder="   Date de naissance"
        />
        <input
          className="emailInput"
          type="email"
          value={inputValue1}
          onChange={handleInputChange1}
          placeholder="   example@email.com"
        />
        <input
          className="passwordInput"
          type="password"
          value={password0}
          onChange={handlePasswordChange0}
          placeholder="   Entrer le mot de passe"
        />
        <input
          className="confirm"
          type="password"
          value={password1}
          onChange={handlePasswordChange1}
          placeholder="   Reentrer le mot de passe"
        />
        <div className="hiddingElement">s</div>
        <span className="hiddingElement2">ssssssssssssssssssssss</span>
        <button className="signInButton" onClick={handleClick}>Sign Up</button>
        <div className="hiddingElement3">s</div>
        <div className="hiddingElement3">s</div>
        <span className="hiddingElement4">sssssssssssssssssssssssssssss</span>
        <span className="orText" >Or</span>
        <div className="hiddingElement">s</div>
        <span className="hiddingElement4">ssssssssssssssssssssss</span>
        <button className="googleSignIn" onClick={signIn}></button>
        <div className="hiddingElement3">s</div>
        <div className="hiddingElement3">s</div>
        <div className="hiddingElement3">s</div>
        <span className="hiddingElement4">sssssss</span>
        <span className="dontHavingAnAccountText">Vous avez déjà un compte ?</span>
        <span className="hiddingElement4">ssss</span>
        <Link className="createNewOneText" to="/SignInPage">Sign In</Link>
      </div>
    </> 
  );
}
function isPasswordValid(password) {
  for (let i = 0; i < password.length; i++) {
    if (password[i] === ' ') {
      return false; // Password contains spaces
    }
  }

  return true; // Password is valid
}
export default SingUpPage;
