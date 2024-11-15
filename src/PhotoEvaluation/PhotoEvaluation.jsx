import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import ToggleMenu from "../ToggleMenu/ToggleMenu";
import { Link } from "react-router-dom";
import "./PhotoEvaluation.css";

export const PhotoEvaluation = ({ className, ...props }) => {
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const compressedImages = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            new Compressor(file, {
              quality: 0.3,
              maxWidth: 800,
              maxHeight: 800,
              success: (compressedFile) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  resolve({ name: compressedFile.name, content: reader.result.split(",")[1] });
                };
                reader.onerror = reject;
                reader.readAsDataURL(compressedFile);
              },
              error: reject,
            });
          })
      )
    );
    setUploadedImages((prevImages) => [...prevImages, ...compressedImages]);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    const compressedImages = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            new Compressor(file, {
              quality: 0.3,
              maxWidth: 800,
              maxHeight: 800,
              success: (compressedFile) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  resolve({ name: compressedFile.name, content: reader.result.split(",")[1] });
                };
                reader.onerror = reject;
                reader.readAsDataURL(compressedFile);
              },
              error: reject,
            });
          })
      )
    );
    setUploadedImages((prevImages) => [...prevImages, ...compressedImages]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  //백엔드
  const handleSubmit = async () => {
    try {
      const files = uploadedImages.map(img => ({
        name: img.name || "", 
        content: img.content 
      }));
      const response = await fetch("http://localhost:4000/picture/assess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: files 
        }),
        mode: "cors",
      });
  
      if (!response.ok) {
        throw new Error("사진 평가 요청에 실패했습니다.");
      }
  
      const data = await response.json();
      console.log("사진 평가 결과:", data);
      alert("사진 평가가 완료되었습니다!");
    } catch (error) {
      console.error("에러 발생:", error);
      alert("사진 평가 요청에 실패했습니다.");
    }
  

    navigate("/result", { state: { images: uploadedImages.map((img) => `data:image/jpeg;base64,${img.content}`) } });
  };

  return (
    <div className={"photo-evaluation " + className}>
      <ToggleMenu />
      <div className="rectangle-31"></div>
      
      <Link to="/" className="organeyes-1">
        <img src="organeyes-10.png" alt="Organeyes logo" style={{ width: '187px', height: '125px' }} />
      </Link>

      <div
        className={`rectangle-32 ${isDragging ? "drag-over" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {uploadedImages.length > 0 ? (
          uploadedImages.map((image, index) => (
            <img
              key={index}
              className="photo"
              src={`data:image/jpeg;base64,${image.content}`}
              alt={`uploaded-${index}`}
            />
          ))
        ) : (
          <img className="placeholder-photo" src="photo.png" alt="default preview" draggable="false" />
        )}
      </div>

      <div className="button-container">
        <label htmlFor="fileUpload" className="upload-button">
          사진 업로드
        </label>
        <input
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />
        <button className="submit-button" onClick={handleSubmit}>
          제출하기
        </button>
      </div>

      <div className="div5">사진 평가</div>
      {uploadedImages.length === 0 && (
        <div className="div6">
          같은 카테고리의 유사한 사진들을 드래그 하거나 파일에서 업로드 해주세요.
        </div>
      )}
    </div>
  );
};

export default PhotoEvaluation;
