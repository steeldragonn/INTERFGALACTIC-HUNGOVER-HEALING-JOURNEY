class Obstacle {
  constructor(gameScreen) {
    // this.left = left;
    // this.top = top;
    this.width = 50;
    this.height = 50;
    this.gameScreen = gameScreen;
    this.element = document.createElement("div");
  }

  itsPosition(x, y) {
    this.element.style.left = ``;
    this.element.style.top = ``;
  }

  //interval?
}
