class Game {
  constructor() {
    this.introScreen = document.querySelector("#intro-screen");
    this.inGameScreen = document.querySelector("#in-game-screen");
    this.endGameScreen = document.querySelector("#end-game-screen");
    this.gameArea = new Gamearena(this.inGameScreen, 200, 500, 1280, 1024);
    this.score = 0;
    this.lives = 7;
    this.scoreDisplay = document.getElementById("score-display");
    this.livesDisplay = document.getElementById("lives-display");
    this.gameIsOver = false;
    this.player = new Player(
      this.inGameScreen,
      550,
      350,
      100,
      150,
      "./js/images/robpattinsonPLAYER.png"
    );
    this.obstacles = [];
  }

  start() {
    this.introScreen.style.display = "none";
    this.inGameScreen.style.display = "block";
    this.gameLoop();
    this.startObstacleComing();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }
    this.update();
    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.move();
    for (let i = 0; i < this.obstacles.length; i++) {
      if (this.player.didCollide(this.obstacles[i])) {
        this.lives--;
        this.obstacles[i].element.remove();
        this.obstacles.splice(i, 1);
      }
    }
    if (this.lives <= 0) {
      this.endGame();
    }

    this.updateLives();
    this.updateScore();
  }

  appearObstacle() {
    const { width, height } = this.gameArea.element.getBoundingClientRect();
    const obstacle = new Obstacle(this.inGameScreen);
    const randomX = Math.floor(Math.random() * (width - 50));
    const randomY = Math.floor(Math.random() * (height - 50));
    obstacle.setPosition(randomX, randomY);
    this.obstacles.push(obstacle);
  }

  startObstacleComing() {
    if (this.gameIsOver) return;
    setInterval(() => {
      if (this.obstacles.length < 9) {
        this.appearObstacle();
      }
    }, 3000);
  }

  updateScore() {
    this.scoreDisplay.textContent = `Score: ${this.score}`;
  }

  updateLives() {
    this.livesDisplay.textContent = `Lives: ${this.lives}`;
  }

  endGame() {
    this.gameIsOver = true;
    // this.gameScreen.style.display = "none";
    // this.gameEndScreen.style.display = "block";

    // this.player.element.remove();
    // this.obstacles.forEach((obstacle) => {
    //   obstacle.elemen.remove();
    // });
  }
}
