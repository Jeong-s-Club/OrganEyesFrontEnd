import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Album.css";

export const Album = ({ className, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [photoGroups, setPhotoGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [showModifyButton, setShowModifyButton] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); 

  useEffect(() => {
    //백엔드-사진 요청
    fetchAlbums(currentPage, sortOrder);
  }, [currentPage, sortOrder]);

  const fetchAlbums = async (page, order) => {
    try {
      const response = await fetch(`/album/{userId}/${page}/${order}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer yourAccessToken`, // 실제 액세스 토큰
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setPhotoGroups(data);
      } else {
        console.error("앨범 로드 실패:", response.status);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  //백엔드-사진 삭제
  const handleImageDelete = async () => {
    if (activeGroupId === null) return;

    const confirmDelete = window.confirm("전체 사진 묶음을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/album/delete/${activeGroupId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer yourAccessToken`,
        },
      });

      if (response.ok) {
        alert("삭제되었습니다.");
        setPhotoGroups(photoGroups.filter((group) => group.groupId !== activeGroupId));
        setActiveGroupId(null);
        setShowModifyButton(false);
      } else {
        console.error("삭제 실패:", response.status);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const toggleSortMenu = () => {
    setIsSortMenuVisible(!isSortMenuVisible);
  };

  const handleSortAsc = () => {
    setSortOrder("asc"); 
    setIsSortMenuVisible(false);
  };

  const handleSortDesc = () => {
    setSortOrder("desc"); 
    setIsSortMenuVisible(false);
  };

  const handleImageClick = (groupId) => {
    setActiveGroupId(groupId);
    setShowModifyButton(true);
  };

  const handleDetailView = () => {
    if (activeGroupId === null) return;

    navigate("/Detail", {
      state: { groupId: activeGroupId },
    });
  };

  const handleModify = () => {
    if (activeGroupId === null) return;
    navigate("/Modify", { state: { groupId: activeGroupId } });
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && (currentPage + 1) * 3 < photoGroups.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentGroups = photoGroups.slice(currentPage * 3, (currentPage + 1) * 3);

  return (
    <div className={"div " + className}>
      <Link to="/" className="organeyes-1">
        <img src="organeyes-10.png" style={{ width: "187px", height: "125px" }} />
      </Link>

      <img className="image-54" src="image-540.png" alt="Background" />

      <div className="polaroid-container">
        {currentGroups.map((group, index) => (
          <div
            key={group.groupId}
            className={`polaroid ${activeGroupId === group.groupId ? "active" : ""}`}
            onClick={() => handleImageClick(group.groupId)}
          >
            <img
              src={group.representative.picture}
              alt={`사진 ${index + 1}`}
              className={`image ${activeGroupId === group.groupId ? "active" : ""}`}
            />
          </div>
        ))}
      </div>

      <div className="arrow-buttons">
        {currentPage > 0 && (
          <button className="arrow-button left-button" onClick={() => handlePageChange("prev")}>
            <img className="left-arrow" src="pngegg-29-10.png" alt="Left Arrow" />
          </button>
        )}
        {(currentPage + 1) * 3 < photoGroups.length && (
          <button className="arrow-button right-button" onClick={() => handlePageChange("next")}>
            <img className="right-arrow" src="pngegg-29-20.png" alt="Right Arrow" />
          </button>
        )}
      </div>

      <div className="rectangle-185" onClick={toggleSortMenu}>
        <div className="sort-text">정렬</div>
      </div>

      {isSortMenuVisible && (
        <div className="sort-menu">
          <button onClick={handleSortAsc}>오름차순 (날짜)</button>
          <button onClick={handleSortDesc}>내림차순 (날짜)</button>
        </div>
      )}

      {activeGroupId && (
        <>
          <div className="rectangle-186" onClick={handleDetailView}>
            <div className="detail-text">자세히 보기</div>
          </div>
          <div className="rectangle-184" onClick={handleImageDelete}>
            <div className="delete-text">사진 삭제</div>
          </div>
          <div className="rectangle-187" onClick={handleModify}>
            <div className="modify-text">사진 수정</div>
          </div>
        </>
      )}

      <img className="rope-1" src="rope-10.png" />
      <img className="clip-1" src="clip-10.png" />
      <img className="clip-2" src="clip-20.png" />
      <img className="clip-3" src="clip-30.png" />
    </div>
  );
};
