// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // 간단한 스타일링을 위함

function App() {
  // 폼 입력을 위한 state 변수들
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  
  // 서버로부터 받은 메시지를 표시하기 위한 state 변수
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // 폼 제출 시 실행될 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지

    // 메시지 초기화
    setMessage('');
    setIsError(false);

    try {
      // 백엔드 API에 POST 요청 보내기
      const response = await axios.post('http://localhost:4000/api/auth/signup', {
        email,
        password,
        nickname
      });
      
      // 성공 시
      setMessage(response.data.message);

    } catch (error) {
      // 실패 시
      setIsError(true);
      if (error.response) {
        // 서버가 에러 응답을 보냈을 때 (예: 중복 이메일)
        setMessage(error.response.data.message);
      } else {
        // 네트워크 오류 등 서버에 도달하지 못했을 때
        setMessage('서버에 연결할 수 없습니다.');
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호 (8자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <button type="submit">가입하기</button>
        </form>
        {message && (
          <p className={isError ? 'error-message' : 'success-message'}>
            {message}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;