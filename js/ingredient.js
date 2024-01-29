class Ingredient {
  constructor(inGameScreen, id) {
    this.inGameScreen = inGameScreen;
    this.element = document.getElementById(id);
    this.collected = false;
  }
}
