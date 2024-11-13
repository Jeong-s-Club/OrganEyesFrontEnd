import React, { useState } from "react";
import "./PhotoEvaluation.css";
import { Link } from "react-router-dom";
import ToggleMenu from "../ToggleMenu/ToggleMenu";


export const PhotoEvaluation = ({ className, ...props }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className={"photo-evaluation " + className}>
      <ToggleMenu />
      <div className="rectangle-31"></div>
      <img className="organeyes-1" src="organeyes-10.png" alt="organeyes logo" />

      {/* 드래그 앤 드롭 영역 */}
      <div
        className={`rectangle-32 ${isDragging ? "drag-over" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {uploadedImages.length > 0 ? (
          uploadedImages.map((image, index) => (
            <img key={index} className="photo" src={image} alt={`uploaded-${index}`} />
          ))
        ) : (
          <img className="photo" src="photo.png" alt="default preview" />
        )}
      </div>

      <div className="rectangle-12"></div>
      <div className="rectangle-8"></div>

      {/* 파일 선택 버튼 */}
      <div className="div4">
        <label htmlFor="fileUpload" style={{ cursor: "pointer" }}>사진 업로드</label>
        <input
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />
      </div>

      <div className="div5">사진 평가</div>
    </div>
  );
};
