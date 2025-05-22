class Obstacle {
  constructor(gameScreen, width, height) {
    this.gameScreen = gameScreen;
    this.width = width;
    this.height = height;
    this.top = -250;

    const possibleXValues = [75, 280];
    this.left = possibleXValues[Math.floor(Math.random() * possibleXValues.length)];

    const obstacleImages = ["./images/sufer.png", "./images/thanos.png","./images/locki.png", "./images/rock.png", "./images/nave.png"];
    const randomIndex = Math.floor(Math.random() * obstacleImages.length);
    this.imageSrc = obstacleImages[randomIndex];

    this.element = document.createElement("img");
    this.element.src = this.imageSrc;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.position = "absolute";
    this.updatePosition();

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.top += 3;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }
}
