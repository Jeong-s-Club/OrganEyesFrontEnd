//테스트용-삭제해도 무방-

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ limit: '10mb' }));

// 예시 유저 데이터
const users = [
    { id: 1, userEmail: 'hey@naver.com', userPw: 'abcd1234!', role: 'USER', nick: 'h' },
];

// 이메일 중복 확인 엔드포인트
app.get('/users/isDuplicate', (req, res) => {
    const { userEmail } = req.query;
    const isDuplicate = users.some(user => user.userEmail === userEmail);

    if (isDuplicate) {
        res.status(400).json({ message: '이 이메일은 이미 사용 중입니다.' });
    } else {
        res.status(200).json({ message: '이 이메일은 사용 가능합니다.' });
    }
});

// 회원가입 엔드포인트
app.post('/users/signup', (req, res) => {
    const { userEmail, userPw, role, nick } = req.body;

    if (users.some(user => user.userEmail === userEmail)) {
        return res.status(400).json({ message: '이 이메일은 이미 사용 중입니다.' });
    }

    const newUser = { id: users.length + 1, userEmail, userPw, role, nick };
    users.push(newUser);

    res.status(200).json({ message: `${nick}님, 회원가입이 완료되었습니다!` });
});

// 앨범 생성 엔드포인트 (사진 업로드 및 저장)
app.post('/album/create', (req, res) => {
    const { files } = req.body;

    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No images provided.' });
    }

    const savedFiles = files.map((file, index) => {
        const { picture, content } = file;
        const buffer = Buffer.from(picture, 'base64');
        const fileName = `image_${Date.now()}_${index}.jpg`; // 고유한 파일 이름 생성
        const filePath = path.join(__dirname, 'uploads', fileName);

        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, buffer);

        return {
            url: `http://localhost:4000/uploads/${fileName}`,
            content
        };
    });

    res.status(200).json({
        message: '앨범에 사진이 정상적으로 저장되었습니다!',
        files: savedFiles,
    });
});

// 앨범에서 사진 삭제 엔드포인트
app.delete('/album/:groupId/delete', (req, res) => {
    const { groupId } = req.params;

    const dirPath = path.join(__dirname, 'uploads', groupId);

    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
        res.status(200).json({ message: '사진 묶음이 삭제되었습니다.' });
    } else {
        res.status(404).json({ message: '사진 묶음을 찾을 수 없습니다.' });
    }
});

// 기본 엔드포인트 (index.html 반환)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
