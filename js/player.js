const gameScreen = document.getElementById("gameScreen");
const player = document.getElementById("player");

class Player {
  constructor(left, top, width, height, gameScreen) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.gameScreen = gameScreen;
    //this.element = document.createElement("img");
  }

  updatePosition() {
    const minLeft = 10;
    const minTop = 10;
    const maxLeft = this.gameScreen.offsetWidth - this.width - 10;
    const maxTop = this.gameScreen.offsetHeight - this.height - 10;
    console.log(maxLeft);

    if (this.left < minLeft) {
      this.left = minLeft;
    }

    if (this.top < minTop) {
      this.top = minTop;
    }

    if (this.left > maxLeft) {
      this.left = maxLeft;
    }

    if (this.top > maxTop) {
      this.top = maxTop;
    }

    player.style.left = `${this.left}px`;
    player.style.top = `${this.top}px`;
  }
}

//const player = new Player(50, 50, 50, 50);

// Updating players position when arrow keys are pressed
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      player.top -= 10;
      break;
    case "ArrowDown":
      player.top += 10;
      break;
    case "ArrowLeft":
      player.left -= 10;
      break;
    case "ArrowRight":
      player.left += 10;
      break;
  }

  player.updatePosition();
});
