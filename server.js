// Node.js의 기본 http 모듈과 querystring 모듈을 불러옵니다.
const http = require('http');
const querystring = require('querystring');

// http.createServer()를 이용해 서버 객체를 생성합니다.
// 요청이 들어올 때마다 이 함수가 실행됩니다.
const server = http.createServer((req, res) => {

  // 1. 메인 페이지 요청 처리 (http://localhost:3000 으로 접속 시)
  if (req.url === '/' && req.method === 'GET') {
    // 응답 헤더: 상태 코드 200(성공), 콘텐츠 타입은 HTML, 한글(utf-8) 설정
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    
    // 브라우저에 보여줄 HTML 본문
    res.end(`
      <html>
        <body>
          <h1>텍스트를 입력하세요</h1>
          <form action="/submit" method="POST">
            <input type="text" name="userInput" />
            <button type="submit">제출</button>
          </form>
        </body>
      </html>
    `);
  } 
  
  // 2. 폼 데이터 제출 요청 처리 ('/submit' 경로로 POST 방식 요청 시)
  else if (req.url === '/submit' && req.method === 'POST') {
    let body = '';

    // 데이터가 조각(chunk) 단위로 들어오는 것을 'body' 변수에 합칩니다.
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // 데이터 수신이 완료되면 실행됩니다.
    req.on('end', () => {
      // 'userInput=입력값' 형태의 문자열을 { userInput: '입력값' } 객체로 변환합니다.
      const parsedBody = querystring.parse(body);
      const userInputText = parsedBody.userInput;

      // 응답 헤더 설정
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      
      // 입력받은 내용을 포함한 결과 페이지 HTML을 실시간으로 생성하여 응답합니다.
      res.end(`
        <html>
          <body>
            <h1>입력된 내용</h1>
            <p>${userInputText}</p>
            <a href="/">돌아가기</a>
          </body>
        </html>
      `);
    });
  } 
  
  // 3. 지정된 URL이 아닐 경우 404 에러 처리
  else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 Not Found</h1><p>페이지를 찾을 수 없습니다.</p>');
  }
});

// 서버가 3000번 포트에서 요청을 기다리도록 설정합니다.
const port = 3000;
server.listen(port, () => {
  console.log(`서버가 http://localhost:${port}/ 주소에서 실행 중입니다.`);
});