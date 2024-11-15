import axios from 'axios';

const API_BASE_URL = "http://localhost:5000";

// 로그인 요청 함수
export async function login(userEmail, userPw) {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, { userEmail, userPw });
        return response.data;
    } catch (error) {
        console.error("로그인 실패:", error.response ? error.response.data : error.message);
        return null;
    }
}

// 이메일 중복 확인 요청 함수
export async function checkEmailDuplicate(userEmail) {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/isDuplicate`, {
            params: { userEmail }
        });
        if (response.status === 200) return true;
    } catch (error) {
        if (error.response && error.response.status === 400) return false;
        console.error("오류 발생:", error.message);
        return null;
    }
}

// 회원가입 요청 함수
export async function signup(userEmail, userPw, role, nick) {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/signup`, { userEmail, userPw, role, nick });
        return response.data;
    } catch (error) {
        console.error("회원가입 실패:", error.response ? error.response.data : error.message);
        return null;
    }
}

// 사진 업로드 요청 함수
export async function uploadPicture(files) {
    try {
        const response = await axios.post(`${API_BASE_URL}/pictures`, { files });
        return response.data;
    } catch (error) {
        console.error("사진 업로드 실패:", error.response ? error.response.data : error.message);
        return null;
    }
}
