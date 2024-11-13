import React from "react";
import { Link } from "react-router-dom";
import "./ToggleMenu.css";

const ToggleMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`toggle-menu ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleMenu}>×</button>
      <ul>
        <li><Link to="/" onClick={toggleMenu}>Main Screen</Link></li>
        <li><Link to="/Login" onClick={toggleMenu}>Login</Link></li>
        <li><Link to="/Component" onClick={toggleMenu}>Component</Link></li>
        <li><Link to="/PhotoEvaluation" onClick={toggleMenu}>Photo Evaluation</Link></li>
        <li><Link to="/Result" onClick={toggleMenu}>Result</Link></li>
        <li><Link to="/Modify" onClick={toggleMenu}>Modify</Link></li>
        <li><Link to="/Lecture" onClick={toggleMenu}>Lecture</Link></li>
        <li><Link to="/Detail" onClick={toggleMenu}>Detail</Link></li>
        <li><Link to="/Album" onClick={toggleMenu}>Album</Link></li>

        <li><button className="menu-button" onClick={() => { toggleMenu(); }}>회원정보</button></li>
        <li><button className="menu-button" onClick={() => { toggleMenu(); }}>로그아웃</button></li>
      </ul>
    </div>
  );
};

export default ToggleMenu;
