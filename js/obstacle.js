class Obstacle {
  constructor(inGameScreen, left, top) {
    this.left = left;
    this.top = top;
    this.width = 40;
    this.height = 40;
    this.inGameScreen = inGameScreen;
    this.element = document.createElement("img");
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.inGameScreen.appendChild(this.element);
    if (typeof left === "number" && typeof top === "number") {
      this.setPosition(left, top);
    }
  }
  setPosition(x, y) {
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }
}
