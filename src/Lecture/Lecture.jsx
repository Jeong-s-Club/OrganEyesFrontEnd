import "./Lecture.css";
import { useState } from "react";

export const Lecture = ({ className, ...props }) => {
  const [inputValue, setInputValue] = useState("여기에 입력해주세요...");
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);

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

  return (
    <div className={"lecture " + className}>
      <img className="rectangle-40" src="rectangle-400.svg" />
      <img className="organeyes-1" src="organeyes-10.png" />
      <div className="rectangle-8"></div>
      <div className="textdiv">돌아가기</div>
      <div className="rectangle-82"></div>
      <div className="div2">완료</div>
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
    </div>
  );
};
