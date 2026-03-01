import React from "react";
import styles from "../css/header.module.css";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.container}>
      <Link to="/">
        <img src={Logo} alt="Logo criptoApp" />
      </Link>
    </header>
  );
};

export default Header;
