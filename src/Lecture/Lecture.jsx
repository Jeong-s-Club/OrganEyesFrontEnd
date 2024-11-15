import "./Lecture.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

export const Lecture = ({ className, ...props }) => {
  const [inputValue, setInputValue] = useState("여기에 입력해주세요...");
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);
  const navigate = useNavigate(); 

  const handleFocus = () => {
    if (isPlaceholderVisible) {
      setInputValue("");
      setPlaceholderVisible(false);
    }
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setInputValue("여기에 입력해주세요...");
      setPlaceholderVisible(true);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const goBack = () => {
    navigate(-1); 
  };

  return (
    <div className={"lecture " + className}>
      <img className="rectangle-40" src="rectangle-400.svg" />
      <button className="rectangle-8" onClick={goBack}>
        돌아가기
      </button>
      <button className="rectangle-82">완료</button>
      <div className="div3">사진에 문구를 넣어주세요.</div>
      <div className="group-15">
        <img className="pngegg-24-1" src="pngegg-24-10.png" />
      </div>
      <textarea
        className="rectangle-38"
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Link to="/" className="organeyes-1">
        <img src="organeyes-10.png" alt="로고" />
      </Link>
    </div>
  );
};
