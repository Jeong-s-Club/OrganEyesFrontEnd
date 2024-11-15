import "./Detail.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Detail = ({ className, ...props }) => {
  const [index, setIndex] = useState(0);
  const images = ["pngegg-24-10.png", "pngegg-24-11.png", "pngegg-24-12.png"]; 

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

      <a href="/" className="organeyes-1">
        <img src="organeyes-10.png" alt="Organeyes Logo" />
      </a>
      
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
