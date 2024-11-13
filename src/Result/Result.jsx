import "./Result.css";
import { Link } from "react-router-dom";
import ToggleMenu from "../ToggleMenu/ToggleMenu";


export const Result = ({ className, ...props }) => {
  return (
    <div className={"div " + className}>
      <ToggleMenu />
      <img className="rectangle-40" src="rectangle-400.svg" />
      <img className="organeyes-1" src="organeyes-10.png" />
      <img className="pngegg-29-1" src="pngegg-29-10.png" />
      <img className="pngegg-29-2" src="pngegg-29-20.png" />
      <button className="rectangle-8"></button>
      <div className="div5">앨범에 추가 </div>
      <button className="rectangle-82"></button>
      <div className="div6">사진 삭제하기 </div>
      <div className="div7">사진 평가 완료 </div>
      <img className="pngegg-24-7" src="pngegg-24-70.png" />
      <img className="pngegg-24-5" src="pngegg-24-50.png" />
      <img className="pngegg-24-6" src="pngegg-24-60.png" />
      <img className="rope" src="rope0.png" />
      <img className="clip-1" src="clip-10.png" />
      <img className="clip-2" src="clip-20.png" />
      <img className="clip-3" src="clip-30.png" />
    </div>
  );
};
