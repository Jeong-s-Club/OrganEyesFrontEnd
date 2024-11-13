import "./LoginVer2.css";

export const LoginVer2 = ({ className, ...props }) => {
  return (
    <div className={"login-ver-2 " + className}>
      <div className="rectangle-4"></div>
      <div className="rectangle-6"></div>
      <div className="rectangle-7"></div>
      
      {/* 로그인 텍스트 */}
      <div className="login">로그인</div>

      {/* 설명 텍스트 */}
      <div className="please-sign-yo-your-account">
        로그인해주시면 더 많은 서비스를 이용할 수 있습니다.
      </div>

      {/* 로그인 버튼 */}
      <button className="login-btn">로그인</button>

      {/* 비회원 이용, 회원 가입 버튼 및 중앙 선 */}
      <div className="button-container">
      <button className="sign-up-btn">회원 가입</button>
      <div className="line-3"></div>
      <button className="non-member-btn">비회원 이용</button>
      </div>

      {/* 아이콘 이미지 */}
      <img className="free-icon-unlock-641693" src="free-icon-unlock-6416930.png" alt="아이콘" />
      <img className="human" src="human0.png" alt="인간 아이콘" />
      
      {/* 라인 */}
      <div className="line-1"></div>
      <div className="line-2"></div>
      
      {/* 하단 배경 */}
      <div className="rectangle-31"></div>

      {/* 하단 로고 */}
      <img className="organeyes-1" src="organeyes-10.png" alt="로고" />
    </div>
  );
};
