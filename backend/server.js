// backend/server.js
const express = require('express');
const cors = require('cors');

// '인증' 담당 부서(라우터) 불러오기
// 파일 경로가 routes/auth.routes.js 로 변경되었습니다.
const authRoutes = require('./routes/auth.routes.js');

const app = express();
const PORT = 4000;

app.use(cors()); 
app.use(express.json()); 

// /api/auth 경로로 들어오는 모든 요청은 이제 authRoutes가 담당합니다.
app.use('/api/auth', authRoutes);

// 나중에 게시글 기능이 추가되면 아래와 같이 한 줄 추가하면 됩니다.
// const postRoutes = require('./routes/posts.routes.js');
// app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`백엔드 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});