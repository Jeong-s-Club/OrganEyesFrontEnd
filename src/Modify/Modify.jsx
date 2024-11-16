import "./Modify.css";
import { Link, useNavigate } from "react-router-dom";
import ToggleMenu from "../ToggleMenu/ToggleMenu";
import { useState } from "react";

export const Modify = ({ className, ...props }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();


  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  const handleModify = () => {
    setShowModal(true); 
  };

  const handleConfirmYes = () => {
    document.getElementById("image-upload").click();
    document.getElementById("image-upload").onchange = () => {
      setShowModal(false);
      navigate("/Lecture"); 
    };
  };

  const handleConfirmNo = () => {
    setShowModal(false);
    navigate("/Lecture"); 
  };

  return (
    <div className={"modify " + className}>
      <ToggleMenu />
      <img className="rectangle-40" src="rectangle-400.svg" />
      <Link to="/" className="organeyes-1">
        <img src="organeyes-10.png" alt="로고" />
      </Link>

      {/* 사진들 */}
      <div className="group-15" onClick={() => handleImageClick("pngegg-24-1")}>
        <img
          className={`pngegg-24-1 ${selectedImage === "pngegg-24-1" ? "selected" : ""}`}
          src="pngegg-24-10.png"
          alt="사진1"
        />
      </div>
      <div className="group-152" onClick={() => handleImageClick("pngegg-24-12")}>
        <img
          className={`pngegg-24-12 ${selectedImage === "pngegg-24-12" ? "selected" : ""}`}
          src="pngegg-24-11.png"
          alt="사진2"
        />
      </div>
      <div className="group-153" onClick={() => handleImageClick("pngegg-24-13")}>
        <img
          className={`pngegg-24-13 ${selectedImage === "pngegg-24-13" ? "selected" : ""}`}
          src="pngegg-24-12.png"
          alt="사진3"
        />
      </div>

      <div className="div4">수정할 사진을 선택해주세요.</div>

      <button className="rectangle-8" onClick={handleGoBack}>
        돌아가기
      </button>

      <button className="rectangle-82" onClick={handleModify}>
        수정하기
      </button>

      <button className="arrow-button pngegg-29-1">
        <img src="pngegg-29-10.png" alt="왼쪽 화살표" />
      </button>
      <button className="arrow-button pngegg-29-2">
        <img src="pngegg-29-20.png" alt="오른쪽 화살표" />
      </button>

      <input
        type="file"
        id="image-upload"
        style={{ display: "none" }}
        accept="image/*"
      />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>사진을 바꾸시겠습니까?</p>
            <button onClick={handleConfirmYes}>예</button>
            <button onClick={handleConfirmNo}>아니오</button>
          </div>
        </div>
      )}
    </div>
  );
};
