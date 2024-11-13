/*백엔드-테스트를 위한 임시 서버 구축*/


const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ limit: '10mb' }));

// 중복 확인용 예시 유저1
const users = [
    { id: 1, userEmail: 'hey@naver.com', userPw: 'abcd1234!', role: 'USER', nick: 'h' },
];

// 이메일 중복 확인 엔드포인트
app.get('/users/isDuplicate', (req, res) => {
    const { userEmail } = req.query;
    console.log(`Received duplicate check request for email: ${userEmail}`);
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
    console.log('New user signed up:', newUser);

    res.status(200).json({ message: `${nick}님, 회원가입이 완료되었습니다!` });
});

// 사진 업로드 엔드포인트
app.post('/pictures', (req, res) => {
    const { files } = req.body;

    if (!files || files.length === 0) {
        return res.status(400).send('No images uploaded.');
    }

    files.forEach((file) => {
        const { name, content } = file;
        const buffer = Buffer.from(content, 'base64');
        const filePath = path.join(__dirname, 'uploads', name);

        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, buffer);
    });

    res.status(200).json({ message: 'Images saved successfully!' });
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
