// const gameScreen = document.getElementById("gameScreen");

const game = new Game(); // replica new instance of Game class

const startButton = document.querySelector("button");
startButton.addEventListener("click", function () {
  game.start();
});
