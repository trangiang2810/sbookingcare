import React from "react";
import { BsList } from "react-icons/bs";
import "../styles/styles.scss";
const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="left">
          <BsList className="iconList" />
          <a href="/">
            <img src="logo2.png" alt="logo" />
          </a>
        </div>
        <div className="right">
          <a href="/">
            <p>
              <span>?</span>
            </p>
            <p>Hỗ trợ</p>
          </a>
          <a href="tel:02473012468">024-7301-2468</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
