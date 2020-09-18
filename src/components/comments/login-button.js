import React from "react";
import styles from "./login-button.module.css";
import { IoLogoGithub } from "react-icons/io";

class LoginButton extends React.Component {
  loginGithub() {
    const redirectUri = encodeURIComponent(window.location.href);

    window.location.assign(
      `https://comments-api.aguang.xyz/oauth/login/github?redirectUri=${redirectUri}`
    );
  }

  render() {
    return (
      <div className={styles.container}>
        Login via
        <span className={styles.link} onClick={() => this.loginGithub()}>
          <IoLogoGithub />
        </span>
        to leave your message~
      </div>
    );
  }
}

export default LoginButton;
