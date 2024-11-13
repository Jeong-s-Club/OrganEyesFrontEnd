/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json({ limit: '10mb' })); // 큰 이미지를 받을 수 있도록 설정

app.post('/pictures', (req, res) => {
  const { files } = req.body; // 프론트엔드에서 전송된 파일 배열

  if (!files || files.length === 0) {
    return res.status(400).send('No images uploaded.');
  }

  files.forEach((file, index) => {
    const { name, content } = file;
    const buffer = Buffer.from(content, 'base64');
    const filePath = path.join(__dirname, 'uploads', name);

    // 디렉토리 생성 후 파일 저장
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, buffer);
  });

  res.status(200).json({ message: 'Images saved successfully!' });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
