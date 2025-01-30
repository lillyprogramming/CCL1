class Spawner {
    #timer = null;
    minSpawnInterval = 1000;         
    currentSpawnInterval = 3000; 
    reductionFactor = 0.95;

    constructor(callback){
        this.callback = callback;
        this.loop();
    }
    loop = () => {
        this.callback();
        this.currentSpawnInterval *= this.reductionFactor;
        if(this.currentSpawnInterval < this.minSpawnInterval){
            this.currentSpawnInterval = this.minSpawnInterval;
        }
        this.#timer = setTimeout(this.loop, this.currentSpawnInterval)
    }
    clearTimer = () =>{
        clearTimeout(this.#timer);
    };
}
export {Spawner};