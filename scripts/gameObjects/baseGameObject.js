import { global } from "../modules/global.js";

class BaseGameObject {
    name;
    active = true;
    x = 100;
    y = 500;
    previousX = 0;
    previousY = 0;
    width = 50;
    height = 50;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    storePositionOfPreviousFrame = function () {
        this.previousX = this.x;
        this.previousY = this.y;
    }

    getBoxBounds = function () {
        const margin = 0;
        let bounds = {
            left: this.x + margin,
            right: this.x + this.width - margin,
            top: this.y + margin,
            bottom: this.y + this.height - margin
        }
        return bounds;
    };

    update = function () {  

    };

    draw = function () {
        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    getNextSprite = function () {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;

        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) {
            this.animationData.currentSpriteIndex++;
            this.animationData.currentSpriteElapsedTime = 0;
            if (this.animationData.currentSpriteIndex > this.animationData.lastSpriteIndex) {
                this.animationData.currentSpriteIndex = this.animationData.firstSpriteIndex
            }
        }
        return this.animationData.animationSprites[this.animationData.currentSpriteIndex];
    };

    loadImages = function (imageSources) {
        for(let i = 0; i < imageSources.length; i++) {
            let image = new Image();
            image.src = imageSources[i];
            this.animationData.animationSprites.push(image);
        }
    }
    loadImagesFromSpritesheet(spritesheetPath, cols, rows) {
        const totalSprites = cols * rows;
        this.animationData.animationSprites = Array.from({ length: totalSprites }, () => new Image());
        const spritesheet = new Image();
        spritesheet.src = spritesheetPath;
        spritesheet.addEventListener("load", () => {
            const spritesheetWidth = spritesheet.width;
            const spritesheetHeight = spritesheet.height;
            const singleSpriteWidth = Math.floor(spritesheetWidth / cols);
            const singleSpriteHeight = Math.floor(spritesheetHeight / rows);
            const tempSpritesheetCanvas = document.createElement("canvas");
            const tempSpritesheetCtx = tempSpritesheetCanvas.getContext("2d");
            tempSpritesheetCanvas.width = singleSpriteWidth;
            tempSpritesheetCanvas.height = singleSpriteHeight;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    tempSpritesheetCtx.clearRect(0, 0, singleSpriteWidth, singleSpriteHeight);
                    tempSpritesheetCtx.drawImage(
                        spritesheet,
                        col * singleSpriteWidth,
                        row * singleSpriteHeight,
                        singleSpriteWidth,
                        singleSpriteHeight,
                        0,
                        0,
                        singleSpriteWidth,
                        singleSpriteHeight
                    );
                    const index = row * cols + col;
                    this.animationData.animationSprites[index].src = tempSpritesheetCanvas.toDataURL();
                }
            }
        });
    }
    
    reactToCollision = function(collidingObject) {

    }

    switchCurrentSprites = function(firstSpriteIndex, lastSpriteIndex) {
        this.animationData.firstSpriteIndex = firstSpriteIndex;
        this.animationData.currentSpriteIndex = firstSpriteIndex;
        this.animationData.lastSpriteIndex = lastSpriteIndex;
    }

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.previousX = x;
        this.previousY = y;
        global.allGameObjects.push(this);
    }
}

export {BaseGameObject};