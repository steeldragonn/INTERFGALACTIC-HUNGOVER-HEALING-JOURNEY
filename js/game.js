class Game {
  constructor() {
    this.introScreen = document.querySelector("#intro-screen");
    this.inGameScreen = document.querySelector("#in-game-screen");
    this.endGameScreen = document.querySelector("#end-game-screen");

    this.gameArea = new Gamearena(this.inGameScreen, 1280, 200, 500, 1024);

    this.startButton = document.querySelector(".button");
    this.startButton.addEventListener("click", () => this.start());
    //all before was to set screen,make arena on screen and add button

    this.score = 0;
    this.lives = 3;
    this.scoreDisplay = document.getElementById("score-display");
    this.livesDisplay = document.getElementById("lives-display");
    //settingscors and lives

    this.gameIsOver = false;

    //now we need create player and obstacle for gamearena
    this.player = new Player(
      this.inGameScreen,
      (this.gameArea.width + this.gameArea.left) / 2,
      this.gameArea.top,
      50,
      50,
      "js/images/robpattinsonPLAYER.png"
    );

    this.obstacle = new Obstacle(
      this.inGameScreen,
      50,
      50,
      20,
      20,
      "js/images/smol.obstacle.png"
    );

    this.obstacles = [];

    this.startObstacleComing();
  }

  //starting game
  start() {
    this.introScreen.style.display = "none";
    this.inGameScreen.style.display = "block";
    this.gameLoop();
  }

  //obtacles should appear and updating on screen
  gameLoop() {
    if (this.gameIsOver) {
      return;
    }
    this.startObstacleComing();
    this.update();
    // window.requestAnimationFrame(() => this.gameLoop());
  }

  //how monsters randomly appear
  appearObstacle() {
    const obstacle = new Obstacle(this.inGameScreen, 50, 50);
    const randomX = Math.floor(Math.random() * this.gameArea.width);
    const randomY = Math.floor(Math.random() * this.gameArea.height);
    console.log(randomX, randomY);
    obstacle.setPosition(randomX, randomY);
    this.obstacles.push(obstacle);
    //this.inGameScreen.appendChild(obstacle.element);
  }

  startObstacleComing() {
    setInterval(() => {
      console.log(this.obstacles.length);
      if (this.obstacles.length < 20) {
        this.appearObstacle();
      }
    }, 10000);
  }

  //when obstacles apearing we are adding collide condition

  didCollide(player, obstacle) {
    const playerLeft = player.left;
    const playerRight = player.left + player.width;
    const playerTop = player.top;
    const playerBottom = player.top + player.height;

    const obstacleLeft = obstacle.left;
    const obstacleRight = obstacle.left + obstacle.width;
    const obstacleTop = obstacle.top;
    const obstacleBottom = obstacle.top + obstacle.height;

    //if we avoid obstacles we are cool. if not then endgame?
    if (
      playerLeft < obstacleRight &&
      playerRight > obstacleLeft &&
      playerTop < obstacleBottom
    ) {
      return true;
    }
    return false;
    //endGame(); - in UPDATE we do this
  }

  //updating all moves from player, if we are bad players - endgame
  update() {
    // this.player.move();
    this.updateLives();
    this.updateScore();

    for (let i = 0; i < this.obstacles.length; i++) {
      if (this.didCollide(this.player, this.obstacles[i])) {
        this.lives--;
        this.obstacles.splice(i, 1);
      }
    }

    if (this.lives === 0) {
      this.endGame();
    }
  }

  //score/lives update after all actions
  updateScore() {
    this.scoreDisplay.textContent = `Score: ${this.score}`;
  }
  updateLives() {
    this.livesDisplay.textContent = `Lives: ${this.lives}`;
  }

  //ending game
  endGame() {
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";

    this.player.element.remove();
    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });
  }
}

//so lets start game

const game = new Game();
//game.start();
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowLeft":
      game.player.moveLeft();
      break;
    case "ArrowRight":
      game.player.moveRight();
      break;
    case "ArrowUp":
      game.player.moveUp();
      break;
    case "ArrowDown":
      game.player.moveDown();
      break;
    default:
  }
});
