import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ToggleMenu from "../ToggleMenu/ToggleMenu";
import "./Result.css";

export const Result = ({ className, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { images } = location.state || {};
  const validImages = images && images.length > 0 ? images : [];

  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 3;
  const [showDeleteIcons, setShowDeleteIcons] = useState(false);

  const currentImages = validImages.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * imagesPerPage < validImages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const navigateToLecture = () => {
    navigate("/lecture", { state: { images: validImages } });
  };

  const toggleDeleteIcons = () => {
    setShowDeleteIcons(!showDeleteIcons);
  };

  const handleDeleteImage = (index) => {
    if (window.confirm("이 사진을 삭제하시겠습니까?")) {
      const updatedImages = [...validImages];
      updatedImages.splice(index, 1);
      navigate("/Result", { state: { images: updatedImages } });
    }
  };

  return (
    <div className={"div " + className}>
      <ToggleMenu />
      <img className="rectangle-40" src="rectangle-400.svg" />
      <Link to="/" className="organeyes-1">
        <img src="organeyes-10.png" />
      </Link>

      {validImages.length > imagesPerPage && (
        <button className="arrow-button left-button" onClick={handlePreviousPage}>
          <img className="left-button" src="pngegg-29-10.png" />
        </button>
      )}

      {validImages.length > imagesPerPage && (
        <button className="arrow-button right-button" onClick={handleNextPage}>
          <img className="right-button" src="pngegg-29-20.png" />
        </button>
      )}

      <button className="rectangle-8" onClick={navigateToLecture}>
        앨범에 추가
      </button>
      <button className="rectangle-82" onClick={toggleDeleteIcons}>
        {showDeleteIcons ? "취소하기" : "사진 삭제하기"}
      </button>

      <div className="div7">사진 평가 완료</div>

      <div className="photo-gallery">
        {currentImages.map((image, index) => (
          <div
            className={`photo-container ${index === 0 ? 'photo1' : index === 1 ? 'photo2' : 'photo3'}`}
            key={index}
          >
            <img
              className="photo"
              src={typeof image === 'string' ? image : `data:image/jpeg;base64,${image.content}`}
              alt={`uploaded-image-${index}`}
            />
            {showDeleteIcons && (
              <div className="delete-icon" onClick={() => handleDeleteImage(index)}>
                ✖
              </div>
            )}
          </div>
        ))}
      </div>

      {currentImages.length >= 1 && <img className="clip-1" src="clip-10.png" />}
      {currentImages.length >= 2 && <img className="clip-2" src="clip-20.png" />}
      {currentImages.length >= 3 && <img className="clip-3" src="clip-30.png" />}

      <img className="rope" src="rope0.png" />
    </div>
  );
};
