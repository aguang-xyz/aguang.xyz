import React from 'react';
import styles from './header.module.css';


import { IoLogoGithub, IoLogoLinkedin, IoMdMail } from 'react-icons/io';

class Header extends React.Component {

  render() {

    return (
      <header className={styles.header}>
        <p className={styles.headerTitle}>
          <a href="#" className={styles.headerLink}>
            Aguang's Blog
          </a>
        </p>

        <nav>
          <ul>
          <li>
              <a href="https://github.com/aguang-xyz" target="_blank">
                <IoLogoGithub />
              </a>
            </li>

            <li>
              <a href="https://www.linkedin.com/in/wang-guangrui-80337a193/" target="_blank">
                <IoLogoLinkedin />
              </a>
            </li>

            <li>
              <a href="mailto:aguang.xyz@gmail.com" target="_blank">
                <IoMdMail />
              </a>
            </li>
            
          </ul>
        </nav>
        
      </header>
    );
  }
}

export default Header;
