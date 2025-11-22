/////////////// Some Needed Functions & Variables
function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}
const Vi = 0.001;
const increment = 0.00005;
////////// Main Function
export default class Ball {
  constructor(ball) {
    this.ball = ball;
    this.main();
  }
  rect() {
    return this.ball.getBoundingClientRect();
  }
  // bounceP(paddleBody){
  //    return paddleBody;
  // }
  get x() {
    return Number(getComputedStyle(this.ball).getPropertyValue("--x"));
  }
  set x(newX) {
    this.ball.style.setProperty("--x", newX);
  }
  get y() {
    return Number(getComputedStyle(this.ball).getPropertyValue("--y"));
  }
  set y(newY) {
    this.ball.style.setProperty("--y", newY);
  }
  reset() {
    this.x = 50;
    this.y = 50;
    this.velocity = Vi;
  }
  main() {
    this.direction = { x: 0, y: 0 };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const random = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(random), y: Math.sin(random) };
    }
    this.velocity = Vi;
    // console.log(this.direction);
  }
  move(deltaTime, paddles) {
    // Calculate new position
    const newX = this.x + this.direction.x * this.velocity * deltaTime;
    const newY = this.y + this.direction.y * this.velocity * deltaTime;

    // Update velocity with frame-rate independent increment
    this.velocity += increment * deltaTime;

    // Wall collision check (using percentage-based positions)
    if (newY <= 0) {
      this.direction.y *= -1;
      this.y = 0;
    } else if (newY >= 100) {
      this.direction.y *= -1;
      this.y = 100;
    } else {
      this.y = newY;
    }

    // Update ball position for paddle collision check
    this.x = newX;
    this.ballRect = this.rect();

    // Check paddle collisions
    const [playerPaddle, computerPaddle] = paddles;

    // Only check collision with the paddle the ball is moving towards
    const relevantPaddle = this.direction.x > 0 ? computerPaddle : playerPaddle;

    if (this.checkCollision(relevantPaddle)) {
      this.handlePaddleCollision(relevantPaddle);
    }
  }

  checkCollision(paddle) {
    // Early exit if ball is far from paddle
    if (this.direction.x > 0 && this.ballRect.left > paddle.right) return false;
    if (this.direction.x < 0 && this.ballRect.right < paddle.left) return false;

    return (
      paddle.left <= this.ballRect.right &&
      paddle.right >= this.ballRect.left &&
      paddle.top <= this.ballRect.bottom &&
      paddle.bottom >= this.ballRect.top
    );
  }

  handlePaddleCollision(paddle) {
    // Reverse x direction
    this.direction.x *= -1;

    // Calculate relative hit position (-1 to 1)
    const paddleHeight = paddle.bottom - paddle.top;
    const ballCenter = (this.ballRect.top + this.ballRect.bottom) / 2;
    const paddleCenter = (paddle.top + paddle.bottom) / 2;
    const hitPosition = (ballCenter - paddleCenter) / (paddleHeight / 2);

    // Apply dynamic angle based on hit position
    const maxAngle = Math.PI / 4;
    const angle = hitPosition * maxAngle;

    // Update direction with new angle while maintaining current x direction
    const xSign = this.direction.x > 0 ? 1 : -1;
    this.direction.x = Math.cos(angle) * xSign * this.velocity;
    this.direction.y = Math.sin(angle) * this.velocity;

    // Normalize the direction vector
    const magnitude = Math.sqrt(this.direction.x ** 2 + this.direction.y ** 2);
    this.direction.x /= magnitude;
    this.direction.y /= magnitude;

    // Prevent sticking by moving ball away from paddle
    const offset = this.direction.x > 0 ? 0.5 : -0.5;
    this.x += offset;

    // Increase velocity with a cap
    const maxVelocity = 0.06;
    this.velocity = Math.min(this.velocity * 1.05, maxVelocity);
  }
  scoreIncrement(PS, CS) {
    if (this.rect().left >= window.innerWidth) {
      this.reset();
      PS.textContent = parseInt(PS.textContent) + 1;
      PS.classList.add("score-increment");
      setTimeout(() => PS.classList.remove("score-increment"), 500);
    }
    if (this.rect().right <= 0) {
      this.reset();
      CS.textContent = parseInt(CS.textContent) + 1;
      CS.classList.add("score-increment");
      setTimeout(() => CS.classList.remove("score-increment"), 500);
    }
  }
}
