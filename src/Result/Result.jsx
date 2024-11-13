import "./Result.css";
import { useLocation } from "react-router-dom"; // useLocation을 사용하여 전달된 state를 가져옵니다.
import ToggleMenu from "../ToggleMenu/ToggleMenu";

export const Result = ({ className, ...props }) => {
  const location = useLocation();  // 현재 location 정보를 가져옵니다.
  const { images } = location.state || {};  // images는 PhotoEvaluation에서 전달된 이미지 배열입니다.

  // 각 이미지의 개수에 따라 clip과 pngegg 요소들을 보이도록 설정
  const showClip1 = images && images.length >= 2;
  const showClip2 = images && images.length >= 1;
  const showClip3 = images && images.length >= 3;

  return (
    <div className={"div " + className}>
      <ToggleMenu />
      <img className="rectangle-40" src="rectangle-400.svg" />
      <img className="organeyes-1" src="organeyes-10.png" />

      {/* 좌측 화살표 */}
      <button className="arrow-button left-button">
        <img className="left-button" src="pngegg-29-10.png"/>
      </button>

      {/* 우측 화살표 */}
      <button className="arrow-button right-button">
        <img className="right-button" src="pngegg-29-20.png"/>
      </button>

      <button className="rectangle-8">앨범에 추가</button>
      <button className="rectangle-82">사진 삭제하기</button>

      <div className="div7">사진 평가 완료</div>

      {/* 업로드된 이미지들은 clip2, clip1, clip3에 배치 */}
      {images && images.length > 0 && (
        <img
          className="pngegg-24-6"
          src={images[0]} // 첫 번째 이미지를 pngegg-24-6에 배치
          alt="uploaded-image"
        />
      )}

      {/* clip2만 표시되도록 하고 나머지 clip과 pngegg는 숨깁니다. */}
      {showClip2 && <img className="clip-2" src="clip-20.png" />}
      {showClip1 && <img className="clip-1" src="clip-10.png" />}
      {showClip3 && <img className="clip-3" src="clip-30.png" />}
      
      {/* pngegg-24-5와 pngegg-24-7은 두 번째와 세 번째 이미지가 있을 때 보입니다. */}
      {showClip1 && <img className="pngegg-24-5" src="pngegg-24-50.png" />}
      {showClip3 && <img className="pngegg-24-7" src="pngegg-24-70.png" />}

      {/* rope는 항상 보이도록 유지 */}
      <img className="rope" src="rope0.png" />
    </div>
  );
};
