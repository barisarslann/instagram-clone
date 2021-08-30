import React from 'react'
import { Button } from '@material-ui/core';
import { auth } from '../firebase';
import '../style/Header.css'

function Header({user, openSignIn, openSignUp}) {
    return (
        <header className="appHeader">
          <div className="app__header-maxWidth">
            <div className="appLogo">
                <img className="appLogoImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="Instagram Logo" />
            </div>
            {user ? (
                <Button onClick={() => auth.signOut()}>Logout</Button>
            ) : (
                <div className="app__loginContainer">
                    <Button onClick={() => openSignIn(true)}>Sign In</Button>
                    <Button onClick={() => openSignUp(true)}>Sign Up</Button>
                </div>
            )}
          </div>
      </header>
    )
}

export default Header;