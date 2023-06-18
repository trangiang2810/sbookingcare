import React from "react";
import "../styles/styles.scss";
import { FaFacebookSquare, FaYoutubeSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>© 2023 BookingCare.</p>
        <div className="item">
          <div className="icon">
            <FaFacebookSquare className="iconfb" />
          </div>
          <div className="icon">
            <FaYoutubeSquare className="iconyt" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
