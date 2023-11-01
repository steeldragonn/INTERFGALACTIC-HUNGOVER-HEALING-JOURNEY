class Player {
  constructor(gameScreen, left, top, width, height, img) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.img = img;
    //("/images/robpattinsonPLAYER.png");

    this.element = document.createElement("img");
    this.element.src = this.img;
    this.element.style.position = "absolute";
    this.element.style.left = `${left}px`;
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);
    this.move();
  }

  move() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.top -= 10;
          break;
        case "ArrowDown":
          this.top += 10;
          break;
        case "ArrowLeft":
          this.left -= 10;
          break;
        case "ArrowRight":
          this.left += 10;
          break;
      }

      this.updatePosition();
    });
  }

  updatePosition() {
    const minLeft = 10;
    const minTop = 10;
    const maxLeft = this.gameScreen.offsetWidth - this.width - 10;
    const maxTop = this.gameScreen.offsetHeight - this.height - 10;

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

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}

const player = new Player(
  document.getElementById("game-screen"),
  50,
  50,
  50,
  50,
  "/js/images/robpattinsonPLAYER.png"
);

// update players position with arrow keys
