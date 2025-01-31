import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Item extends BaseGameObject {
    active = true;
    yVelocity = -200;
    isDrawn = true;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.3,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    update = function () {
        this.y -= this.yVelocity * global.deltaTime;;
        if(this.y >= global.getCanvasBounds().bottom - global.proportionalObjectSize*2) {
            this.active = false;
            if(this.name === "GoodGuy") {
                this.switchCurrentSprites(1,1);
                global.missedCountDown--;
                this.yVelocity = 0;
            }
            else {
                this.isDrawn = false;
            }
        }
    }

    reactToCollision = function (collidingObject) {
        if (this.name === "GoodGuy" && collidingObject.name === "MainGuy") {
            this.active = false;
            this.isDrawn = false;
            global.pointsCounter ++;
        }
        if (this.name === "Lie" && collidingObject.name === "MainGuy") {
            this.active = false;
            this.isDrawn = false;
            global.missedCountDown ++;
        }
    }

    constructor(x, y, width, height, name, images) {
        super (x, y, width, height, name);
        this.name = name;
        if(this.name === "Lie") {
            this.loadImagesFromSpritesheet("images/lie_turnaround.png", 4, 1);
            this.animationData.lastSpriteIndex = 3;
        }
        else {
            this.loadImages(images);
        }
    }
}

export {Item}
