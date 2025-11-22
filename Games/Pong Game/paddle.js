
////////// Main Function
export default class Paddle {
    constructor(paddle) {
        this.paddle = paddle;
    }
    get position(){
        return Number(getComputedStyle(this.paddle).getPropertyValue('--position')); 
    }
    set position(newPosition){
        this.paddle.style.setProperty('--position', newPosition);
    }
    rect(){
        return this.paddle.getBoundingClientRect();
    }
    moveCompPaddle(deltaTime,ballHeight,compPaddleSpeed){
        this.position += compPaddleSpeed * deltaTime * (ballHeight - this.position);
        // console.log(compPaddleSpeed * deltaTime * (ballHeight - this.position ));
    }
}