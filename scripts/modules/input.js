import { global } from "./global.js";

let speed = 500;
let goingRight = true;

function move(event) {
    switch(event.key) {
        //This works similar to an "and", so that the user can play even with CapsLock on
        case "D":
        case "d":
            global.playerObject.xVelocity = speed;
            global.playerObject.switchCurrentSprites(3,5);
            goingRight = true;
            break;
        case "A":
        case "a":
            global.playerObject.xVelocity = -speed;
            global.playerObject.switchCurrentSprites(0,2);
            goingRight = false;
            break;
    } 
}

function stop() {
    global.playerObject.xVelocity = 0;
    if(goingRight) {
        global.playerObject.switchCurrentSprites(3,3);
    }
    else {
        global.playerObject.switchCurrentSprites(0,0);
    }
}

document.addEventListener("keypress", move);
document.addEventListener("keyup", stop);