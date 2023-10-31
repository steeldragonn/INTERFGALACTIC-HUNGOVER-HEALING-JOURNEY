class Game {
  constructor() {
    this.introScreen = document.querySelector("#intro-screen");
    this.inGameScreen = document.querySelector("#in-game-screen");
    this.endGameScreen = document.querySelector("#end-game-screen");
    this.gameArea = new Gamearena(this.inGameScreen, 200, 500, 1280, 1024);

    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;

    this.player = new Player(
      this.inGameScreen,
      200,
      500,
      100,
      150,
      "./images/robpattinsonPLAYER.png"
    );

    //this.obstacles = [new Obstacle(this.gameScreen)];
  }

  start() {
    this.introScreen.style.display = "none";
    this.inGameScreen.style.display = "block";
    this.gameLoop();
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
    //this.obstacles.forEach((obstacle) => {
    //obstacle.move();
    // this.obstacle.appearObstacle();
    // if (this.player.didCollide(obstacle)) {
    //   this.lives--;
    //   //collide logic here
    // }
    if (this.lives === 0) {
      this.endGame();
    }
  }

  appearObstacle() {
    //new obstacle here?

    this.obstacles = [new Obstacle(this.gameScreen)];
    const randomX = Math.floor(Math.random() * (this.width - obstacle.width));
    obstacle.setPosition(randomX, 0);
    this.obstacles.push(obstacle);
  }

  endGame() {
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";

    this.player.element.remove();
    this.obstacles.forEach((obstacle) => {
      obstacle.elemen.remove();
    });
  }
}
//muchmore here
