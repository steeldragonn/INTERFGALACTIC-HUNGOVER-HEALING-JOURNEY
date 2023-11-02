class Gamearena {
  constructor(inGameScreen, width, left, top, height) {
    this.inGameScreen = inGameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.element = document.createElement("div");
    this.element.id = "game-arena";
    this.inGameScreen.appendChild(this.element);
  }
}

//set gamearena position with all this.staff and added it to in ingamescreen
