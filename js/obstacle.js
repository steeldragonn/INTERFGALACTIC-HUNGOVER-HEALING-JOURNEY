class Obstacle {
  constructor(inGameScreen) {
    this.inGameScreen = inGameScreen;
    this.left = Math.floor(Math.random() * 300 + 70);
    this.top = 0;
    this.width = 50;
    this.height = 50;
    this.element = document.createElement("img");
    this.element.src = "./js/images/2choicefromSTART.pagejpeg.jpeg";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.inGameScreen.appendChild(this.element);
  }

  setPosition(x, y) {
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }
}
