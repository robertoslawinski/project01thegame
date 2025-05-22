class Player {
  constructor(gameScreen, left, top, width, height) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.bullets = [];

    this.element = document.createElement("img");
    this.element.src = "./images/warrior.png";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.position = "absolute";
    this.updatePosition();

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    this.left = Math.max(0, Math.min(this.left, this.gameScreen.offsetWidth - this.width));
    this.top = Math.max(0, Math.min(this.top, this.gameScreen.offsetHeight - this.height));

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    return (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    );
  }
}
