import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class MainGuy extends BaseGameObject{
    name = "MainGuy";
    xVelocity = 0;
    yVelocity = 0;
    active = true;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    update = function () {
        this.x += this.xVelocity * global.deltaTime;
        this.screenWrap();
        if(global.missedCountDown <= 0) {
            this.active = false;
            global.gameOver = true;
        }
    }

    screenWrap = function () {
        let canvasBounds = global.getCanvasBounds();
        let pacManBounds = this.getBoxBounds();
        if (pacManBounds.left >= canvasBounds.right) {
            this.x = canvasBounds.left - this.width;
        }
        else if (pacManBounds.right <= canvasBounds.left) {
            this.x = canvasBounds.right;
        }
    }

    reactToCollision = function(collidingObject) {
        switch(collidingObject.name) {
            case "BadGuy":
                this.active = false;
                global.gameOver = true;
                break;
        }
    }

    constructor(x,y,width,height) {
        super(x,y,width,height);
        this.loadImagesFromSpritesheet("images/main_guy_walking.png",2,3);
    }
}
export { MainGuy }