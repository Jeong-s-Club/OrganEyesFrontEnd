import "./Component.css";
import { Link } from "react-router-dom";

export const Component = ({ className, ...props }) => {
  return (
    <div className={"component " + className}>
      <div className="rectangle-31"></div>
      <div className="rectangle-14"></div>
      <div className="div2">회원가입</div>
      <div className="div3">회원이 되어 더 많은 기능을 즐겨보세요.</div>
      
      {/* 아이디 입력 필드 */}
      <div className="group-7">
        <div className="div4">
          <span>
            <span className="div-4-span">아이디</span>
            <span className="div-4-span2">*</span>
            
          </span>
        </div>
        <input className="rectangle-15" type="text" placeholder="아이디를 입력하세요" />
        <button className="check-btn">중복확인</button>
      </div>

      {/* 비밀번호 입력 필드 */}
      <div className="group-8">
        <div className="div5">
          <span>
            <span className="div-5-span">비밀번호</span>
            <span className="div-5-span2">*</span>
          </span>
        </div>
        <input className="rectangle-152" type="password" placeholder="비밀번호를 입력하세요" />
      </div>

      {/* 닉네임 입력 필드 */}
      <div className="group-9">
        <div className="div6">닉네임</div>
        <input className="rectangle-153" type="text" placeholder="닉네임을 입력하세요" />
      </div>

      {/* 이전으로 버튼 */}
      <button className="cancel-btn">이전으로</button>

      {/* 회원가입 버튼 */}
      <button className="sign-up-btn">회원가입</button>

      {/* 로고 이미지 */}
      <Link to="/" className="organeyes-1">
        <img src="organeyes-10.png" alt="로고" />
      </Link>
    </div>
  );
};
