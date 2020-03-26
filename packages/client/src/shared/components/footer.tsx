import React, { Component } from 'react';
import logo from '../../assets/img/pokeball.svg';

function Footer(props: any) {
  return (
    <footer className="footer-wrapper">
      <div className="footer-empty"></div>
      <div className="footer-text">
        <span className="footer-text_left">Poké</span>
      </div>
      <img
        className="pokelogo footer-icon"
        src={logo} alt="logo"
      />
      <div className="footer-text">
        <span className="footer-text_right">Dash</span>
      </div>
      <div className="footer-empty"></div>
    </footer>
  );
}

export default Footer;
