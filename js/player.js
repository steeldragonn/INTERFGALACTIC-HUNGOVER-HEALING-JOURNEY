class Player {
  constructor(inGameScreen, left, top, width, height, img) {
    this.inGameScreen = inGameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.img = img;
    this.element = document.createElement("img");
    this.element.classList.add("player");
    this.element.src = this.img;
    this.element.style.position = "absolute";
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.inGameScreen.appendChild(this.element);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;
    const boundaries = {
      minLeft: 5,
      maxLeft: this.inGameScreen.offsetWidth - this.width - 10,
      minTop: 5,
      maxTop: this.inGameScreen.offsetHeight - this.height - 10,
    };

    const { minLeft, maxLeft, minTop, maxTop } = boundaries;

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
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();
    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }

  didCollide(ingredient) {
    if (ingredient.collected) {
      return false;
    }
    // if (!this.ingredientPressCounters[catingr]) {
    //   this.ingredientPressCounters[catingr] = 0;
    // }
    const playerRect = this.element.getBoundingClientRect();
    const ingredientRect = ingredient.element.getBoundingClientRect();
    if (
      playerRect.left < ingredientRect.right &&
      playerRect.right > ingredientRect.left &&
      playerRect.top < ingredientRect.bottom &&
      playerRect.bottom > ingredientRect.top
    ) {
      ingredient.collected = true;
      ingredient.element.style.display = "none";
      return true;
    } else {
      return false;
    }
  }
}
