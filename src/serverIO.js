import express from "express";
import path from "path";
import http from "http";
import { Server } from 'socket.io';

const app = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.get('/', (req, res) => res.render("home"));

////////// 여기까지는 WS 랑 동일

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", socket => {
    socket.on("room", (msg) => console.log(msg))
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);