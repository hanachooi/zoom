import express from "express";

/*
Express : HTTP 요청을 처리하고 라우팅을 관리하며,
클라이언트에게 응답을 제공하는 데 사용
*/

const app = express();

app.set("view engine", "pug");

// pug 파일의 경로 설정, pug 파일명은 "home"
app.set("views", __dirname + "/views");
app.get("/", (req, res) => res.render("home"));

//  클라이언트로부터의 요청에 대한 응답을 제공하기 
// 위해 라우팅을 설정하는 코드
app.get("/", (req,res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);