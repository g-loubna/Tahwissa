import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useGoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import {gapi} from 'gapi-script'
import axios from 'axios';
import "./SignInPageStyle.css"
function SingInPage() {
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [alertM, setAlert] = useState('');
  const [login, setLogin] = useState('Sign In');
  const handleInputChange = (e) => {
    if(!isValidEmailFormat(e.target.value)){
      setAlert("tu doit respecter le format example@email.com")
    }
    setInputValue(e.target.value);
    if(isValidEmailFormat(e.target.value)){
      setAlert("") 
    }
  };
  const handleClick = () => {
    if (inputValue.trim() !== '' && password.trim() !== '' && isValidEmailFormat(inputValue) && password.length >= 8 && containsNumber(password) && !containsSpace(password)) {
      
      const dataToSend = {
        inputValue: inputValue,
        password: password
      };

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
    }else if(inputValue.trim() == '' && password.trim() == ''){
      setAlert("tu doit remplir l'email et le mot de passe les deux ensemble")
    } 
    if(login == "reset password"){
      navigate("/ResetPassword");
    }
  };
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    if (newPassword.length < 8){
      setAlert("le mot de passe doit etre au moins de 8 caracteres")
    }
    if(!containsNumber(newPassword)){
      setAlert("le mot de passe doit contenir un nombre")
    }
    if(containsSpace(newPassword)){
      setAlert("le mot de passe ne doit pas contenir un espace")
    }
    
    if(password.length >= 8 && containsNumber(password) && !containsSpace(password)){
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
    console.log('Google Login Response auth code :', response.code);
    /*axios.post("http://localhost:4000/auth/login", response.code)
        .then(response => {
          // 
          console.log('Response from server:', response.data);
        })
        .catch(error => {
          
          console.error('Error sending data:', error);
        });*/
    alert("succussefully logged in")
    navigate('/FreindPostsPage');
  };
  const handleGoogleLoginFailure = (error) => {
   alert('Google Login Failure:', error);
  };
  const { signIn } = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onFailure: handleGoogleLoginFailure,
    clientId: '398229315292-d0dra2tha7c02camgbg1p33d4t8fu3sg.apps.googleusercontent.com', 
  });
  function isValidEmailFormat(inputData) {
  // Check if the inputData contains '@' and '.'
  if (inputData.includes('@') && inputData.includes('.')) {
    // Check if '@' comes before '.'
    const atIndex = inputData.indexOf('@');
    const dotIndex = inputData.lastIndexOf('.');
    
    if (atIndex < dotIndex) {
      // Check if there's at least one character before '@' and after '.'
      if (atIndex > 0 && dotIndex < inputData.length - 1) {
        return true;
      }
    }
  }

  return false;
}
  return (
    <>  
      <div className="signInSpace1_">
        <p className="signInText_">Sign In</p><span className="alert">     {alertM}</span>
        <input
          className="emailInput_"
          type="email"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="   example@email.com"
        />
        <input
          className="passwordInput_"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="   Entrer le mot de passe"
        />
        <div className="hiddingElement_">s</div>
        <span className="hiddingElement2_">ssssssssssssssssssssssss</span>
        <button className="signInButton_" onClick={handleClick}>{login}</button>
        <div className="hiddingElement3_">s</div>
        <div className="hiddingElement3_">s</div>
        <span className="hiddingElement4_">sssssssssssssssssssssssssssssss</span>
        <span className="orText_" >Or</span>
        <div className="hiddingElement_">s</div>
        <span className="hiddingElement4_">ssssssssssssssssssssssss</span>
        <button className="googleSignIn_" onClick={signIn}></button>
        <div className="hiddingElement3_">s</div>
        <div className="hiddingElement3_">s</div>
        <div className="hiddingElement3_">s</div>
        <span className="hiddingElement4_">ssss</span>
        <span className="dontHavingAnAccountText_">Vous n'avez pas de compte ?</span>
        <span className="hiddingElement4_">ss</span>
        <Link className="createNewOneText_" to="/SignUpPage">Créer un nouveau</Link>
      </div>
    </> 
  );
}

export default SingInPage;
