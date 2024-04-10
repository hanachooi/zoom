// 서버단과 소켓 통신이 가능하게 함. 양방향 통신이기 때문.
// 프론트의 소켓은 서버로의 연결을 뜻함. 
const messageList = document.querySelector("ul");
const messageForm = document.getElementById("myForm");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected To Server");
})

socket.addEventListener("message", (message) => {
    console.log("New message : ", message.data , " from the server");
});

socket.addEventListener("close", () => {
    console.log("DisConnected from Server");
})

setTimeout(() => {
    socket.send("hello from the browser!");
}, 100000);

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("#messageInput");
    console.log("Input:" , input.value);
    socket.send(input.value);
}

messageForm.addEventListener("submit", handleSubmit);