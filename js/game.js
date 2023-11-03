class Game {
  constructor() {
    this.introScreen = document.querySelector("#intro-screen");
    this.inGameScreen = document.querySelector("#in-game-screen");
    this.endGameScreen = document.querySelector("#end-game-screen");
    this.winGameScreen = document.querySelector("win-screen");
    this.gameArea = new Gamearena(this.inGameScreen, 1280, 200, 500, 1024);
    this.startButton = document.querySelector(".button");
    this.startButton.addEventListener("click", () => this.start());
    // all before was to set screen,make arena on screen and add button

    this.ingredientElements = document.querySelectorAll(".ingredient");
    // document.addEventListener("keydown", (event) =>
    //   this.collectIngredients(event)
    // );

    this.score = 0;
    this.lives = 3;
    this.scoreDisplay = document.getElementById("score-display");
    this.livesDisplay = document.getElementById("lives-display");
    //settingscors and lives

    this.catingrClicks = 0;

    this.gameIsOver = false;

    //now we need create player and obstacle for gamearena
    this.player = new Player(
      this.inGameScreen,
      (this.gameArea.width + this.gameArea.left) / 2,
      this.gameArea.top,
      70,
      70,
      "js/images/NEWROB.png"
    );

    this.obstacle = new Obstacle(
      this.inGameScreen,
      50,
      50,
      20,
      20,
      "js/images/SMOLOBSTACLEWITHBG.png"
    );

    this.obstacles = [];

    this.gameLoop();
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
    window.requestAnimationFrame(() => this.gameLoop());
  }

  //imdonewiththisone
  // collectIngredients(event) {
  //   const ingredient = event.target;
  //   if (event.code === "Space" && ingredient.classList.contains("ingredient")) {
  //     switch (ingredient.id) {
  //       case "catingr":
  //         this.catingrClicks++;
  //         if (this.catingrClicks === 2) {
  //           this.score += 10;
  //           this.catingrClicks = 0;
  //         }
  //         break;

  //       case "spongeingr":
  //         this.score += 20;
  //         break;

  //       case "absentingr":
  //         this.score += 20;
  //         break;

  //       case "hungoverdandelion":
  //         this.score += 15;
  //         break;
  //     }
  //   }
  //   this.updateScore();
  // }

  //how monsters randomly appear
  appearObstacle() {
    const obstacle = new Obstacle(this.inGameScreen, 50, 50);
    const randomX = Math.floor(Math.random() * this.gameArea.width);
    const randomY = Math.floor(Math.random() * this.gameArea.height);
    obstacle.setPosition(randomX, randomY);
    this.obstacles.push(obstacle);
    // this.inGameScreen.appendChild(obstacle.element);
  }

  startObstacleComing() {
    setInterval(() => {
      if (this.obstacles.length < 20) {
        this.appearObstacle();
      }
    }, 10000);
  }

  //when obstacles apearing we are adding collide condition
  didCollide(player, obstacle) {
    const playerRect = player.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();
    // console.log("position of the player =>", playerRect);
    // console.log("position of the obstacle =>", obstacleRect);
    // // checking collide between them
    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top > obstacleRect.bottom &&
      playerRect.bottom < obstacleRect.top
    ) {
      console.log(`collision`);
      return true; // if  collide
    } else {
      console.log("YOU ARE FINE SO FAR!");
      return false; // if no
    }
    this.updateLives();
  }

  //updating all moves from player, if we are bad players - endgame
  update() {
    this.player.updatePosition();
    for (let i = 0; i < this.obstacles.length; i++) {
      console.log(this.didCollide(this.player, this.obstacles[i]));
      if (this.didCollide(this.player, this.obstacles[i])) {
        console.log("YOU COLLIDED!");
        this.obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.lives--;
        i--;
      }
    }

    if (this.lives === 0) {
      this.endGame();
    }
    if (this.score === 85) {
      this.winGame();
    }

    this.updateLives();
    this.updateScore();
  }

  //score/lives update after all actions
  updateScore() {
    this.scoreDisplay.textContent = `Score: ${this.score}`;
  }

  updateLives() {
    this.livesDisplay.textContent = `Lives: ${this.lives}`;
  }

  winGame() {
    this.gameIsOver = true;
    this.inGameScreen.style.display = "none";
    this.winGameScreen.style.display = "block";
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });
  }

  endGame() {
    this.gameIsOver = true;
    this.inGameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });
  }
}

//so lets start game

//adding event to arrows so they will work
const game = new Game();
document.addEventListener("keydown", (event) => {
  event.preventDefault();
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
