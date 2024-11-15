import "./Lecture.css";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Lecture = ({ className, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { images } = location.state || { images: [] };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("여기에 입력해주세요...");
  const [captions, setCaptions] = useState(images.map(() => "")); 
  const [groupId] = useState(Date.now()); 

  const handleFocus = () => {
    if (inputValue === "여기에 입력해주세요...") {
      setInputValue("");
    }
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setInputValue("여기에 입력해주세요...");
    }
  };

  const handleChange = (e) => {
    const updatedCaptions = [...captions];
    updatedCaptions[currentIndex] = e.target.value;
    setCaptions(updatedCaptions);
    setInputValue(e.target.value);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setInputValue(captions[currentIndex - 1] || "여기에 입력해주세요...");
    } else {
      navigate(-1); 
    }
  };
  const handleNext = async () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setInputValue(captions[currentIndex + 1] || "여기에 입력해주세요...");
    } else {
      try {
        const groupData = {
          files: images.map((image, index) => ({
            picture: image,
            content: captions[index] || ""
          })),
          addedFiles: images.map((image, index) => ({
            picture: image,
            content: captions[index] || ""
          }))
        };
  
        // 백엔드로 그룹 데이터 전송
    const response = await fetch(`http://localhost:4000/album/${groupId}/update`, {
     method: "PATCH",
    headers: {
     "Content-Type": "application/json",
     "Authorization": `Bearer yourAccessToken` // 실제 액세스 토큰
     },
     body: JSON.stringify(groupData) // 전체 그룹 데이터 전송
        });
  
        if (response.ok) {
          alert("앨범에 사진이 정상적으로 수정되었습니다!");
          navigate("/Album", { state: { groupData } }); // Album으로 데이터 전달
        } else {
          console.error("수정 실패:", response.status);
        }
      } catch (error) {
        console.error("오류 발생:", error);
      }
    }
  };
  
  const formatCaption = (caption) => {
    const validCaption = caption || "";
    if (validCaption.length > 40) {
      return validCaption.slice(0, 37) + "...";
    }
    return validCaption;
  };

  return (
    <div className={"lecture " + className}>
      <Link to="/" className="organeyes-1">
        <img src="organeyes-10.png"/>
      </Link>

      <img className="rectangle-40" src="rectangle-400.svg" alt="Background" />

      <button className="rectangle-8" onClick={handlePrevious}>
        {currentIndex === 0 ? "돌아가기" : "이전"}
      </button>
      <button className="rectangle-82" onClick={handleNext}>
        {currentIndex === images.length - 1 ? "완료" : "다음"}
      </button>

      <div className="div3">사진에 문구를 넣어주세요.</div>

      <div className="group-15">
        <img className="pngegg-24-1" src={images[currentIndex]} alt="uploaded" />
        <div className="caption-text">{formatCaption(captions[currentIndex])}</div>
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
