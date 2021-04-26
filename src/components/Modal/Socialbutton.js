import React from 'react';
import SocialLogin from 'react-social-login';
import './socialButton.css';
import GoogleButton from "./GoogleSignIn.png"

function Socialbutton({ children, triggerLogin, ...props }) {
  
    return (
        <button 
        className="google-button"
        
        onClick={triggerLogin} {...props}>
            {children}
            <img
            className = "google-image"
            src = {GoogleButton}>
            </img>
          </button>
    )
}

export default SocialLogin(Socialbutton);
