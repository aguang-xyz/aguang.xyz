import React from 'react';
import './WelcomePage.css';

import logo from '../images/logo.svg';

export default function WelcomePage() {
  return (
    <div className="WelcomePage">
      <header className="WelcomePage-header">
        <img src={logo} className="WelcomePage-logo" alt="logo" />
        <p>
          Aguang's Blog
        </p>
        <a
          className="WelcomePage-link"
          href="#/home"
        >
          Learn More
        </a>
      </header>
    </div>
  );
}
