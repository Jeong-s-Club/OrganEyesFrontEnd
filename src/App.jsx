import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainScreenVer2 } from "./MainScreenVer2/MainScreenVer2";
import { LoginVer2 } from "./LoginVer2/LoginVer2";
import { Component } from "./Component/Component";
import { PhotoEvaluation } from "./PhotoEvaluation/PhotoEvaluation";
import { Result } from "./Result/Result";
import { Modify } from "./Modify/Modify";
import {Lecture} from "./Lecture/Lecture";
import {Detail} from "./Detail/Detail";
import {Album} from "./Album/Album";
import { useState } from "react";
import ToggleMenu from "./ToggleMenu/ToggleMenu";

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="app">
        {!isMenuOpen && (
          <div className="hamburger_icon" onClick={toggleMenu}>
            <img src="hamburger_icon.png"/>
          </div>
        )}

        {/* 사이드 메뉴 */}
        <ToggleMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <Routes>
          <Route path="/" element={<MainScreenVer2 />} />
          <Route path="/Login" element={<LoginVer2 />} />
          <Route path="/Component" element={<Component />} />
          <Route path="/PhotoEvaluation" element={<PhotoEvaluation />} />
          <Route path="/Result" element={<Result />} />
          <Route path="/Album" element={<Album />} />
          <Route path="/Modify" element={<Modify />} />
          <Route path="/Lecture" element={<Lecture />} />
          <Route path="/Detail" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
