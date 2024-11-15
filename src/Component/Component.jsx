import "./Component.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Component = ({ className, ...props }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const checkEmailDuplicate = async () => {
    console.log("Checking email:", email);
    try {
      const response = await axios.get("http://localhost:5000/users/isDuplicate", {
        params: { userEmail: email },
      });
      if (response.status === 200) {
        setMessage("이 이메일은 사용 가능합니다.");
        setMessageColor("#4CAF50");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage("이 이메일은 이미 사용 중입니다.");
        setMessageColor("#FF1F1F");
      } else {
        setMessage("오류 발생: 서버와 연결할 수 없습니다.");
        setMessageColor("#FF1F1F");
      }
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:4000/users/signup", { /* 백엔드 */
        userEmail: email,
        userPw: password,
        nick: nickname,
        role: "USER", 
      });
      if (response.status === 200) {
        alert(`${nickname}님, 환영합니다!`);
        navigate("/PhotoEvaluation"); 
      }
    } catch (error) {
      console.error("회원가입 오류:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className={"component " + className}>
      <div className="rectangle-31"></div>
      <div className="rectangle-14"></div>
      <div className="div2">회원가입</div>
      <div className="div3">회원이 되어 더 많은 기능을 즐겨보세요.</div>

      <div className="group-7">
        <div className="div4">
          <span>
            <span className="div-4-span">아이디</span>
            <span className="div-4-span2">*</span>
          </span>
        </div>
        <input
          className="rectangle-15"
          type="text"
          placeholder="아이디를 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="check-btn" onClick={checkEmailDuplicate}>
          중복확인
        </button>
        {message && (
          <div className="email-message" style={{ color: messageColor }}>
            {message}
          </div>
        )}
      </div>

      <div className="group-8">
        <div className="div5">
          <span>
            <span className="div-5-span">비밀번호</span>
            <span className="div-5-span2">*</span>
          </span>
        </div>
        <input
          className="rectangle-152"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="group-9">
        <div className="div6">닉네임</div>
        <input
          className="rectangle-153"
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <button className="cancel-btn">이전으로</button>

      <button className="sign-up-btn" onClick={handleSignup} disabled={!email || !password || !nickname}>
        회원가입
      </button>

      <Link to="/" className="organeyes-1">
        <img src="organeyes-10.png"/>
      </Link>
    </div>
  );
};
