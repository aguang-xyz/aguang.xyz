import React from 'react';
import styles from './header.module.css';

class Header extends React.Component {

  render() {

    return (
      <header className={styles.header}>
        <p className={styles.headerTitle}>
          <a href="#" className={styles.headerLink}>
            Aguang's Blog
          </a>
        </p>
      </header>
    );
  }
}

export default Header;
