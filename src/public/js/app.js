const socket = io();

const myFace = document.getElementById("myFace");

let myStream;

async function getMidea(){
    try{
        myStream = await navigator.mediaDevices.getUserMedia(
            {
                audio : true,
                video : true,
            }
        );
        myFace.srcObject = myStream;
    }catch(e){
        console.log(e);
    }
}

getMidea();