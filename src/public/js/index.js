// 서버단과 소켓 통신이 가능하게 함. 양방향 통신이기 때문.
// 프론트의 소켓은 서버로의 연결을 뜻함. 
const messageList = document.querySelector("ul");
const messageForm = document.getElementById("myForm");
const socket = new WebSocket(`ws://${window.location.host}`);
const nickForm = document.getElementById("nick");

// 백엔드와의 통신을 위해, JavaScript 객체를 JSON 문자열로 변환하는 함수이다.
function makeMessage(type, payload){
    const msg =  {type, payload};
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connected To Server");
})

// socket.addEventListener("message", (message) => {
//     console.log("New message : ", message.data , " from the server");
// });

socket.addEventListener("close", () => {
    console.log("DisConnected from Server");
});

// 메시지를 받으면, 화면에 li를 하나씩 추가해줌
socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

setTimeout(() => {
    socket.send("hello from the browser!");
}, 100000);

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("#messageInput");
    // console.log("Input:" , input.value);

    // 서버 단에서 받은 메세지를 다시 프론트 단에서 서버 단으로 넘기면, 양방향 통신
    socket.send(makeMessage("new_message", input.value));
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", (event) => {

    event.preventDefault();
    const input = nickForm.querySelector("input");
    const m = makeMessage("nickname", input.value);
    // string 형 json으로 넘겨지는 것 확인 가능
    console.log(m);
    socket.send( m );

})