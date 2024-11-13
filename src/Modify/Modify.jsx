import "./Modify.css";
import { Link } from "react-router-dom";
import ToggleMenu from "../ToggleMenu/ToggleMenu";


export const Modify = ({ className, ...props }) => {
  return (
    <div className={"modify " + className}>
       <ToggleMenu />
      <img className="rectangle-40" src="rectangle-400.svg" />
      <Link to="/" className="organeyes-1">
        <img src="organeyes-10.png" alt="로고" />
      </Link>
      <div className="group-15">
        <img className="pngegg-24-1" src="pngegg-24-10.png" />
      </div>
      <div className="group-152">
        <img className="pngegg-24-12" src="pngegg-24-11.png" />
      </div>
      <div className="group-153">
        <img className="pngegg-24-13" src="pngegg-24-12.png" />
      </div>
      <div className="div4">수정할 사진을 선택해주세요. </div>
      <div className="rectangle-8"></div>
      <div className="div5">돌아가기 </div>
      <div className="rectangle-82"></div>
      <div className="div6">수정하기 </div>
      <img className="pngegg-29-1" src="pngegg-29-10.png" />
      <img className="pngegg-29-2" src="pngegg-29-20.png" />
    </div>
  );
};
