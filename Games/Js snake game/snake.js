////////////////////////////////// Game Variables //////////////////////////////////////
const board = document.querySelector(".board");
let snakeArr = [
  {
    x: 10,
    y: 10,
  },
];

let direction = {
  x: 0,
  y: 0,
};

let food = {
  x: 2 + Math.round(Math.random() * 16),
  y: 2 + Math.round(Math.random() * 16),
};

let speed = 5;
let score = document.querySelector(".score");
let hiScore = document.querySelector(".high-score");

// Music elements
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');

////////////////////////////////// Game Functions //////////////////////////////////////
/////// Movement
const movement = () => {
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;
};

/////// Movement Logic
window.addEventListener("keydown", (e) => {
  if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
    if (direction.y === -1) {
      return;
    }
    if (direction.y != 1) {
      direction.y = -1;
      direction.x = 0;
    }
  }
  if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
    if (direction.x === -1) {
      return;
    }
    if (direction.x != 1) {
      direction.x = -1;
      direction.y = 0;
    }
  }
  if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
    if (direction.y === 1) {
      return;
    }
    if (direction.y != -1) {
      direction.y = 1;
      direction.x = 0;
    }
  }
  if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
    if (direction.x === 1) {
      return;
    }
    if (direction.x != -1) {
      direction.x = 1;
      direction.y = 0;
    }
  }
});

//////// Collision
const collision = () => {
  /////// If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  return false;
};

//////// Handling Circumstances Like Bumping
const collided = () => {
  if (collision()) {
    direction = { x: 0, y: 0 };
    // Play game over sound
    gameOverSound.play();

    // Delay
    setTimeout(() =>{
      location.reload();
      snakeArr = [
        {
          x: 10,
          y: 10,
        },
      ];
    }, 500);
  }
};

/////// Penetration
const penetrate = () => {
  if (snakeArr[0].y < 1) {
    snakeArr[0].y = 20;
  } else if (snakeArr[0].y > 20) {
    snakeArr[0].y = 1;
  }
  if (snakeArr[0].x < 1) {
    snakeArr[0].x = 20;
  } else if (snakeArr[0].x > 20) {
    snakeArr[0].x = 1;
  }
};

////////////////////////////////// Display Functionalities//////////////////////////////////
////// Score-Status
let scoreStatus = 0;

///// highScore Status and logics
let hiScoreStatus = 0;
hiScoreStatus = JSON.parse(localStorage.getItem("highScore"));
let highScore = localStorage.getItem("highScore");

/////// Snake & Food & Score
const render = () => {
  board.innerHTML = "";
  snakeArr.forEach((s, index) => {
    const snake = document.createElement("div");
    if (index === 0) {
      snake.classList.add("snake-head");
    } else {
      snake.classList.add("snake-body");
    }
    snake.style.gridRowStart = s.y;
    snake.style.gridColumnStart = s.x;
    board.appendChild(snake);
  });
  const snakeFood = document.createElement("div");
  snakeFood.classList.add("food");
  snakeFood.style.gridRowStart = food.y;
  snakeFood.style.gridColumnStart = food.x;
  board.appendChild(snakeFood);

  /////// Growth
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    scoreStatus++;
    
    // Play food sound
    foodSound.play();
    
    snakeArr.unshift({
      x: snakeArr[0].x + direction.x,
      y: snakeArr[0].y + direction.y,
    });
    food = {
      x: 2 + Math.round(Math.random() * 15),
      y: 2 + Math.round(Math.random() * 15),
    };
    speed += 0.2;
    if (hiScoreStatus < scoreStatus) {
      hiScoreStatus = scoreStatus;
      localStorage.setItem("highScore", JSON.stringify(hiScoreStatus));
    }
  }
  
  /////// Score
  score.innerHTML = "Score: " + scoreStatus;
  ////// High Score
  hiScore.innerHTML = "High Score:" + hiScoreStatus;
};


/////////////////////////////////////////// Sum-up /////////////////////////////
const gameFunctionality = () => {
  movement();
  render();
  collided();
  penetrate();
};

//////////////////////////////////////// Main Method///////////////////////////
let lastRTime = 0;
const mainFunction = (ctime) => {
  window.requestAnimationFrame(mainFunction);
  if ((ctime - lastRTime) / 1000 < 1 / speed) {
    return;
  }
  lastRTime = ctime;
  gameFunctionality();
};

window.requestAnimationFrame(mainFunction);
