import express from "express";
import path from "path";
import http from "http";
import WebSocket from "ws";

/*
Express : HTTP 요청을 처리하고 라우팅을 관리하며,
클라이언트에게 응답을 제공하는 데 사용
*/
const app = express();

// views 디렉토리 설정
app.set("views", path.join(__dirname, "views"));

// 정적 파일 제공 (js, html, css 등)
app.use(express.static(path.join(__dirname, "public")));

// 뷰 엔진 설정 pug 파일이 뷰 엔진임
app.set("view engine", "pug");

// 홈 화면 렌더링
app.get('/', (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// app.listen(3000, handleListen);

// http 서버 위에 ws 서버 올림.
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// connection이 이루어질 때마다, 소켓 통신이 이루어지게 됌. 
function handleConnection(socket) {
    console.log(socket);
    console.log("소켓 연결");
}
wss.on("connection", handleConnection)



server.listen(3000, handleListen);