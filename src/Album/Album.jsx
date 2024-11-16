import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Album.css";

export const Album = ({ className, ...props }) => {
  const [selectedImage, setSelectedImage] = useState(null); 
  const navigate = useNavigate(); 

  
  const handleGoToLecture = () => {
    navigate("/Lecture"); 
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); 
        handleGoToLecture();
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleImageDelete = () => {
    setSelectedImage(null); 
  };

  return (
    <div className={"div " + className}>
      <img className="organeyes-1" src="organeyes-10.png" alt="Logo" />
      <img className="image-54" src="image-540.png" alt="Background" />
      <img className="pngegg-24-7" src="pngegg-24-70.png" alt="Polaroid 1" />
      <img className="pngegg-24-5" src="pngegg-24-50.png" alt="Polaroid 2" />
      <img className="pngegg-24-6" src="pngegg-24-60.png" alt="Polaroid 3" />
      <img className="pngegg-29-1" src="pngegg-29-10.png" alt="Left Arrow" />
      <img className="pngegg-29-2" src="pngegg-29-20.png" alt="Right Arrow" />

      <div
        className="rectangle-183"
        onClick={() => document.getElementById("image-upload").click()} 
      >
        <div htmlFor="image-upload" className="upload-text">
          사진 업로드
        </div>
        <input
          type="file"
          id="image-upload"
          style={{ display: "none" }} 
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <div className="rectangle-184" onClick={handleImageDelete}>
        <div className="delete-text">사진 삭제</div>
      </div>

      <img className="rope-1" src="rope-10.png" alt="Rope" />
      <img className="clip-1" src="clip-10.png" alt="Clip 1" />
      <img className="clip-2" src="clip-20.png" alt="Clip 2" />
      <img className="clip-3" src="clip-30.png" alt="Clip 3" />
    </div>
  );
};
