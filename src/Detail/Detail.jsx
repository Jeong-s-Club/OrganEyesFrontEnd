import "./Detail.css";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export const Detail = ({ className, ...props }) => {
  const location = useLocation();
  const { groupId } = location.state || {}; 
  
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  // 백엔드-사진 요청
  useEffect(() => {
    if (groupId) {
      fetch(`http://localhost:4000/album/${groupId}`, {  // url변경?
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer yourAccessToken`, // 액세스토큰
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("데이터 가져오기에 실패했습니다.");
          }
          return response.json();
        })
        .then(data => {
          setImages(data.images); 
        })
        .catch(error => {
          console.error("오류 발생:", error);
        });
    }
  }, [groupId]);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const getImageClass = (i) => {
    if (i === index) return "central-image";
    if (i === (index + 1) % images.length) return "right-image";
    return "left-image";
  };

  return (
    <div className={"detail " + className}>
      <img className="rectangle-40" src="rectangle-400.svg" alt="Background" />

      <Link to="/" className="organeyes-1">
        <img src="organeyes-10.png" alt="Organeyes Logo" />
      </Link>

      <Link to="/Lecture" className="rectangle-182 div4">
        사진 수정
      </Link>

      <button className="arrow left-arrow" onClick={handlePrev}>
        &#10094;
      </button>

      <div className="polaroid-container">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className={`polaroid ${getImageClass(i)}`}
            alt={`Polaroid ${i + 1}`}
          />
        ))}
      </div>

      <button className="arrow right-arrow" onClick={handleNext}>
        &#10095;
      </button>

      <div className="indicators">
        {images.map((_, i) => (
          <span
            key={i}
            className={`indicator ${i === index ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
};
