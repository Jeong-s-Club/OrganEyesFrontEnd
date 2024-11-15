import "./Modify.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ToggleMenu from "../ToggleMenu/ToggleMenu";
import { useState } from "react";

export const Modify = ({ className, ...props }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedImages, setUpdatedImages] = useState([]); // Store the updated images here
  const navigate = useNavigate();
  const location = useLocation();
  const { groupId } = location.state || {}; // Get groupId from Album

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
    document.getElementById("image-upload").onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUpdatedImages((prevImages) => [
            ...prevImages,
            { picture: reader.result, content: "Updated content" }, // Add custom content if needed
          ]);
        };
        reader.readAsDataURL(file);
      }
      setShowModal(false);
    };
  };

  const handleConfirmNo = () => {
    setShowModal(false);
    navigate("/Lecture");
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/album/${groupId}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer yourAccessToken`, // Replace with actual token
        },
        body: JSON.stringify({
          files: updatedImages, // The list of updated images
          addedFiles: updatedImages, // Include any new images here if needed
        }),
      });

      if (response.ok) {
        alert("수정이 성공적으로 저장되었습니다.");
        navigate("/Lecture", { state: { groupId } }); // Navigate to Lecture
      } else {
        console.error("수정 저장 실패:", response.status);
        alert("수정 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("오류 발생: 수정 요청이 실패했습니다.");
    }
  };

  return (
    <div className={"modify " + className}>
      <ToggleMenu />
      <img className="rectangle-40" src="rectangle-400.svg" />
      <Link to="/" className="organeyes-1">
        <img src="organeyes-10.png" />
      </Link>

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

      <button className="rectangle-82" onClick={handleSaveChanges}>
        저장하기
      </button>

      <button className="arrow-button pngegg-29-1">
        <img src="pngegg-29-10.png" />
      </button>
      <button className="arrow-button pngegg-29-2">
        <img src="pngegg-29-20.png" />
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
