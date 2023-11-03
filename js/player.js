class Player {
  constructor(inGameScreen, left, top, width, height, imgSrc) {
    this.inGameScreen = inGameScreen;
    this.left = left;
    this.top = top;
    // this.width = width;
    // this.height = height; ----
    this.positionX = 0;
    this.positionY = 0;

    this.element = document.createElement("img");

    this.element.src = imgSrc;
    this.element.style.position = "absolute";

    //initial position of player in html  element on ingamescreen
    this.element.style.left = `${left}px`;
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.top = `${top}px`;

    this.inGameScreen.appendChild(this.element);
    //we added this stupido to imGameScreen
  }

  moveLeft() {
    this.left -= 10;
    this.updatePosition();
  }
  moveRight() {
    this.left += 10;
    this.updatePosition();
  }
  moveUp() {
    this.top -= 10;
    this.updatePosition();
  }
  moveDown() {
    this.top += 10;
    this.updatePosition();
  }

  //when obstacles apearing we are adding collide condition

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
