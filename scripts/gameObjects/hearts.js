import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Heart extends BaseGameObject {
    active = true;
    isDrawn = true;
    name = "Heart";

    animationData = {
        "animationSprites": [],
        "timePerSprite": 1,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 1,
        "currentSpriteIndex": 0
    };

    update = function () {
    }

    reactToCollision = function (collidingObject) {
    }
    draw = function () {
        let sprite = this.getNextSprite();
        for (let i = global.missedCountDown; i > 0; i--) {
            global.ctx.drawImage(sprite, i * 100 - 50, 50,80,80);
        }
    };
    constructor(width, height) {
        super (width, height);
        this.loadImagesFromSpritesheet("./images/heart_beat1.png", 2, 1);
    }
}

export {Heart}
