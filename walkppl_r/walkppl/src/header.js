import React from "react";
import styles from "./header.module.css"
import logo from './logo.svg';

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}><img src={logo} height={80} width={80}/></div>
      <div className={styles.logoText}><p>WalkPeople</p></div>
    </div>
  );
}
export default Header;