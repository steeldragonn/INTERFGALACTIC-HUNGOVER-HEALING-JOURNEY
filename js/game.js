class Game {
  constructor() {
    this.introScreen = document.querySelector("#intro-screen");
    this.inGameScreen = document.querySelector("#in-game-screen");
    this.endGameScreen = document.querySelector("#end-game-screen");
    this.winGameScreen = document.querySelector("#win-screen");
    this.nextLevel = document.querySelector("#nextlevel-screen");
    this.gameArea = new Gamearena(this.inGameScreen, 200, 500, 1280, 1024);
    this.score = 0;
    this.lives = 7;
    this.scoreDisplay = document.getElementById("score-display");
    this.livesDisplay = document.getElementById("lives-display");
    this.gameIsOver = false;
    this.player = new Player(
      this.inGameScreen,
      70,
      70,
      70,
      70,
      "/js/images/pattinson.png"
    );

    this.obstacles = [];
    this.ingredients = [
      new Ingredient(this.inGameScreen, "catingr"),
      new Ingredient(this.inGameScreen, "spongeingr"),
      new Ingredient(this.inGameScreen, "absentingr"),
      new Ingredient(this.inGameScreen, "hungoverdandelion"),
    ];
    this.ingredientClickCounters = {};
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
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.player.didCollide(this.ingredients[i])) {
        this.score++;
        this.ingredients[i].collected = true;
        this.ingredients[i].element.style.display = "none";
      }
    }

    if (this.lives <= 0) {
      this.endGame();
    }
    if (this.score >= 4) {
      this.winGame();
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
      if (this.obstacles.length < 80) {
        this.appearObstacle();
      }
    }, 400);
  }

  updateScore() {
    this.scoreDisplay.textContent = `Score: ${this.score}`;
  }

  updateLives() {
    this.livesDisplay.textContent = `Lives: ${this.lives}`;
  }

  endGame() {
    this.gameIsOver = true;
    this.nextLevel.style.display = "none";
    this.inGameScreen.style.display = "none";
    this.endGameScreen.style.display = "block";
  }
  winGame() {
    this.gameIsOver = true;
    this.inGameScreen.style.display = "none";
    this.nextLevel.style.display = "block";
    // this.winGameScreen.style.display = "block";
  }
  winLevel() {
    this.gameIsOver = true;
    this.inGameScreen.style.display = "none";
    this.nextLevel.style.display = "none";
    this.winGameScreen.style.display = "block";
  }
}
