// backend/routes/auth.routes.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); // 설명을 위한 가짜 DB

const router = express.Router();

// --- 1. 회원가입 API ---
// 최종 경로: POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, nickname } = req.body;
    if (!email || !password || !nickname) {
      return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: '비밀번호는 8자 이상이어야 합니다.' });
    }
    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: '이미 사용 중인 이메일입니다.' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await db.createUser({
      email,
      password: hashedPassword,
      nickname
    });
    res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.', userId: newUser.id });
  } catch (error) {
    console.error('[서버 오류]', error);
    res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
  }
});

// --- 2. 로그인 API (나중에 구현할 자리) ---
// 최종 경로: POST /api/auth/login
router.post('/login', async (req, res) => {
  // TODO: 로그인 로직 구현
  res.status(200).json({ message: '로그인 API - 구현 예정' });
});

// --- 3. 로그아웃 API (나중에 구현할 자리) ---
// 최종 경로: POST /api/auth/logout
router.post('/logout', async (req, res) => {
  // TODO: 로그아웃 로직 구현
  res.status(200).json({ message: '로그아웃 API - 구현 예정' });
});

module.exports = router;