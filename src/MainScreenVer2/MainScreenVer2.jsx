import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainScreenVer2.css";

export const MainScreenVer2 = ({ className, ...props }) => {
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 LoginVer2 페이지로 이동
  const handleLoginClick = () => {
    navigate("/Login");
  };

  // 회원 가입 버튼 클릭 시 Component 페이지로 이동
  const handleSignupClick = () => {
    navigate("/Component");
  };

  return (
    <div className={"main-screen-ver-2 " + className}>
      <div className="rectangle-31"></div>
      <img className="_3-1" src="_3-10.png" alt="3-1" />
      <img className="pngegg-24-3" src="pngegg-24-30.png" alt="pngegg-24-3" />
      <img className="_1778-1" src="_1778-10.png" alt="1778-1" />
      <img className="pngegg-24-4" src="pngegg-24-40.png" alt="pngegg-24-4" />
      <div className="hello">
        Hello,
        <br />
        (유저 이름!)
      </div>
      <div className="hello2">
        Hello,
        <br />
        (유저 이름!)
      </div>
      <img className="pngegg-28-1" src="pngegg-28-10.png" alt="28-1" />
      <button className="button login" onClick={handleLoginClick}>
        로그인
      </button>
      <button className="button signup" onClick={handleSignupClick}>
        회원 가입
      </button>
      <img className="organeyes-1" src="organeyes-10.png" alt="organeyes" />
      <img className="_452-1" src="_452-10.png" alt="452-1" />
      <img className="pngegg-24-2" src="pngegg-24-20.png" alt="24-2" />
    </div>
  );
};
