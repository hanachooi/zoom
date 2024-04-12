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

// http 서버 위에 ws 서버 올림.
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


// 아래의 코드는 웹 소켓 서버에서 클라이언트 간에 메시지를 전달하는 기능을 구현한 것입니다. 각 클라이언트의 웹 소켓 연결이 생성되면 서버는 해당 클라이언트의 웹 소켓을 clients 객체에 추가합니다. 그 후, 클라이언트가 메시지를 보내면 서버는 해당 메시지를 받아들이고, 이를 다시 연결된 모든 클라이언트에게 전달합니다.

// 기능 요약:

// 새로운 클라이언트가 서버에 연결되면, 해당 클라이언트의 웹 소켓을 clients 객체에 추가합니다.
// 클라이언트가 메시지를 보내면, 서버는 해당 메시지를 받아들이고, 모든 연결된 클라이언트에게 해당 메시지를 전달합니다.
// 클라이언트의 연결이 종료되면, 해당 클라이언트의 웹 소켓을 clients 객체에서 제거합니다.

// 웹 소켓 서버에서 새로운 클라이언트가 연결될 때마다 한 객체씩 배열에 넣어줌
const sockets = [];

wss.on("connection", (socket) => {
    
    sockets.push(socket);
    socket["nickname"] = "Anon";
    socket.on("close", () => console.log("Disconnected from the Browser"));
    
    // 웹소켓은 데이터를 전송할 때 기본적으로 이진 데이터를 사용함.
    // 따라서, json 형식으로 문자열을 보내도 서버에서는 이를 이진 데이터로 수신
    // 따라서, 서버에서 수신된 메시지를 처리 하기 전에, 먼저 이진 데이터를 문자열로 변환 한 후,
    // JSON.parse() 메서드를 사용하여 JavaScript 객체로 변환해야함. 
    socket.on("message", (message) => {
        // 이진 데이터를 문자열로 처리
        const messageString = message.toString('utf-8');
        console.log(messageString);

        // 문자열을 자바스크립트 객체로 변환
        const parsed = JSON.parse(messageString);
        console.log(parsed);

        // 프론트에 전송
        switch(parsed.type){
            case "new_message" :
                //sockets.forEach((aSocket) => aSocket.send(parsed.payload)); 이건 그냥 들어오는 값의 payload를 반환
                // 아래는 소켓에서 초기화해놓은, 닉네임인 Anon에, 자신이 작성한 메시지가 추가가 됌.
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname} : ${parsed.payload}`));
                break;
            case "nickname" :
                // 아래는 Anon이 아닌, 자신이 입력한 닉네임(payload)의 값이 입력되게 됌. 
                socket["nickname"] = parsed.payload;
                break;
        }

    });

});

server.listen(3000, handleListen);