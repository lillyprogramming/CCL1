import { global } from "./global.js";
import { MainGuy } from "../gameObjects/mainGuy.js";
import { Item } from "../gameObjects/items.js";
import {Spawner} from "../gameObjects/itemSpawner.js";
import { Heart } from "../gameObjects/hearts.js";
global.ctx.font = '100px #000000';
let point_b = new Image();
point_b.src = "./images/point_background.png";
let button = document.getElementById("playButton");
let spawner;

function gameLoop(totalRunningTime) { 
    if(!global.gameOver && global.gameStarted && global.pointsCounter < 20) {
        global.deltaTime = totalRunningTime - global.prevTotalRunningTime;
        global.deltaTime /= 1000;
        global.prevTotalRunningTime = totalRunningTime;
        global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
        global.ctx.fillStyle = '#a8f72a';
        global.ctx.fillRect(0, global.getCanvasBounds().bottom - global.proportionalObjectSize*2, global.getCanvasBounds().right, global.proportionalObjectSize*2);
        global.ctx.drawImage(point_b, global.getCanvasBounds().right - global.proportionalObjectSize*5, 0, global.proportionalObjectSize*5, global.proportionalObjectSize*3);
        global.ctx.font = '3rem Arial';
        global.ctx.fillStyle = '#7ab51c';
        global.ctx.fillText(`Points: ${global.pointsCounter}/20`, global.getCanvasBounds().right - global.proportionalObjectSize*4, global.proportionalObjectSize*1.5);
        for (var i = 0; i < global.allGameObjects.length; i++) { 
            if(global.allGameObjects[i].active) {
                global.allGameObjects[i].storePositionOfPreviousFrame();
                global.allGameObjects[i].update();
                global.checkCollisionWithAnyOther(global.allGameObjects[i]);
                global.allGameObjects[i].draw();
            }
            if(global.allGameObjects[i].isDrawn) {
                global.allGameObjects[i].draw();
            }
        }
        requestAnimationFrame(gameLoop);
    }
    else if(global.pointsCounter >= 20) {
        global.gameWon = true;
        changeDisplay("../images/win_screen.png");
    }
    else {
        global.gameOver = true;
        button.style.display = "block";
        button.src = "./images/replay_button.png";
        changeDisplay("./images/end_screen2.png");
    }
}
  function goodOrBadGuy() {
    let num = global.getRandomNum(1,10);
    switch(num) {
        case 1: return ["BadGuy",["./images/piano.png","./images/piano.png"], 2];
        case 2: return ["GoodGuy",["./images/chocolate.png","./images/chocolate_cracked.png"], 1];
        case 3: return ["GoodGuy", ["./images/egg.png", "./images/egg_cracked.png"], 1];
        case 4: return ["GoodGuy", ["./images/sugar.png", "./images/sugar_cracked.png"], 1];
        case 5: return ["GoodGuy", ["./images/flour.png", "./images/sugar_cracked.png"], 1];
        case 6: return ["GoodGuy", ["./images/butter.png", "./images/butter_cracked.png"], 1];
        case 6: return ["GoodGuy", ["./images/milk.png", "./images/milk_cracked.png"], 1];
        case 7: return ["GoodGuy", ["./images/vanilla.png", "./images/vanilla_cracked.png"], 1];
        case 8: return ["BadGuy",["./images/froggy.png","./images/froggy.png"], 2];
        case 9: return ["Lie",[], 1.5];
        default: return ["BadGuy",["./images/cat.png","./images/cat.png"], 2];
    }
  }
function changeDisplay(newSrc) {
    global.background.style.display = "block";
    global.background.src = newSrc;
}
function setupGame() {
    global.ctx.imageSmoothingEnabled = false;
    global.playerObject = new MainGuy(global.getCanvasBounds().right/2, global.getCanvasBounds().bottom - global.proportionalObjectSize*5, global.proportionalObjectSize * 3, global.proportionalObjectSize * 3);
    new Heart(200, 200);
    spawner = new Spawner(() => {
        let sortingHatArr = goodOrBadGuy();
        new Item(global.getRandomNum(0,global.getCanvasBounds().right - global.proportionalObjectSize*2), 0, global.proportionalObjectSize * sortingHatArr[2], global.proportionalObjectSize  * sortingHatArr[2], sortingHatArr[0],sortingHatArr[1]);
    });
}

document.addEventListener("visibilitychange", () => {
    if(!document.hidden) {
        global.prevTotalRunningTime = performance.now();
    }
})

function startGame() {
    button.style.display = "none";
    global.gameStarted = true;
    global.background.style.display = "none";
    global.canvas.style.display = "block";
    global.pointsCounter = 0;
    global.missedCountDown = 5;
    global.allGameObjects = [];
    global.gameOver=false;
    global.gameWon = false;
    if(spawner){
        spawner.clearTimer();
    }
    setupGame();
    requestAnimationFrame(gameLoop);
}
function tutorial() {
    button.removeEventListener("click", tutorial);
    button.addEventListener("click", startGame);
    button.src = "./images/play_button.png"
    changeDisplay("./images/instructions3.png");
}
button.addEventListener("click", function () {
    tutorial();
});

