const game = new Game();

const startButton = document.getElementsByClassName("button");

startButton.addEventListener("click", function () {
  game.start();
});
