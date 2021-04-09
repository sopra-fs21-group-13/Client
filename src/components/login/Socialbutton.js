import React from 'react'
import SocialLogin from 'react-social-login'

function Socialbutton({ children, triggerLogin, ...props }) {
  
    return (
        <button onClick={triggerLogin} {...props}>
            {children}
          </button>
    )
}

export default SocialLogin(Socialbutton);
