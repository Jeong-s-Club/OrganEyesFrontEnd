import "./LoginVer2.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ToggleMenu from "../ToggleMenu/ToggleMenu";
import axios from "axios";

export const LoginVer2 = ({ className, ...props }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //백엔드-로그인 정보
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        userEmail: email,
        userPw: password,
      });

      if (response.status === 200) {
        alert("로그인 성공!");
        navigate("/PhotoEvaluation");
      }
    } catch (error) {
      console.error("로그인 실패:", error.response ? error.response.data : error.message);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  const handleSignUp = () => {
    navigate("/Component");
  };

  const handleNonMember = () => {
    alert("비회원 이용자입니다.");
    navigate("/PhotoEvaluation");
  };

  return (
    <div className={"login-ver-2 " + className}>
      <ToggleMenu />
      <div className="rectangle-4"></div>
      <div className="rectangle-6">
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="rectangle-7">
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="login">로그인</div>
      <div className="please-sign-yo-your-account">
        로그인해주시면 더 많은 서비스를 이용할 수 있습니다.
      </div>

      <button className="login-btn" onClick={handleLogin}>
        로그인
      </button>

      <div className="button-container-wrapper">
        <div className="rectangle-31"></div>
        <div className="button-container">
          <button className="sign-up-btn" onClick={handleSignUp}>회원 가입</button>
          <div className="line-3"></div>
          <button className="non-member-btn" onClick={handleNonMember}>비회원 이용</button>
        </div>
      </div>

      <img className="free-icon-unlock-641693" src="free-icon-unlock-6416930.png" />
      <img className="human" src="human0.png" />
      <div className="line-1"></div>
      <div className="line-2"></div>

      <Link to="/" className="organeyes-1">
        <img src="organeyes-10.png" />
      </Link>
    </div>
  );
};
