class Player {
  constructor(inGameScreen, left, top, width, height, imgSrc) {
    this.inGameScreen = inGameScreen;
    this.left = left;
    this.top = top;
    // this.width = width;
    // this.height = height; ---- bcs we need it position but not all size
    this.directionX = 0;
    this.directionY = 0;

    this.element = document.createElement("img");

    this.element.src = imgSrc; // what if i added img in new player?
    this.element.style.position = "absolute"; //-when

    //where rob will move
    this.element.style.left = `${left}px`;
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.top = `${top}px`;

    this.inGameScreen.appendChild(this.element);
    //we added this stupido to imGameScreen

    this.move(); //AND NOW IT HAS TO MOVE
  }

  //how it will move
  // do we need this.step in upper?
  move() {
    const step = 0;
    this.left += this.directionX + step;
    this.top += this.directionY + step;

    if (this.left < 10) {
      this.left = 10;
    }
    if (this.top < 10) {
      this.top = 10;
    }

    if (this.top > this.inGameScreen.offsetHeight - this.height - 10)
      this.top = this.inGameScreen.offsetHeight - this.height - 10;

    this.updatePosition();
  }
  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    // const minLeft = 10;
    // const minTop = 10;
    //   const maxLeft = this.inGameScreen.offsetWidth - this.width - 10;
    //   const maxTop = this.inGameScreen.offsetHeight - this.height - 10;
  }
}

const player = new Player(
  document.getElementById("in-game-screen"),
  10,
  10,
  10,
  10,
  "/js/images/robpattinsonPLAYER.png"
);
