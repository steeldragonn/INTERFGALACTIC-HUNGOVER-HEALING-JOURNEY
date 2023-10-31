class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    // this.player = null;
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "/images/robpattinsonPLAYER.png"
    );

    this.height = 600;
    this.width = 500;
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
  }

  start() {
    // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Hide the start screen
    this.startScreen.style.display = "none";

    // Show the game screen
    this.gameScreen.style.display = "block";

    // Start the game loop
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameisOver) {
      return;
    }
    //this.update();
    //window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.move();
    const obstacle = this.obstacles[0];
    //obstacle.move();

    if (this.player.didCollide(obstacle)) {
      this.lives--;
      //obstacle.element.remove();
      // this.obstacles = [];
      //this.obstacles.push(new Obstacle(this.gameScreen));
    }

    if (this.lives === 0) {
      this.endGame();
    }
  }

  endGame() {
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
    this.obstacles = [];
    this.player.element.remove();
    this.obstacles[0].element.remove();
  }
}
