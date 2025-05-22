class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameContainer = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");
    this.livesElement = document.getElementById("lives");
    this.scoreElement = document.getElementById("score");

    this.player = new Player(this.gameScreen, 75, 400, 125, 200);
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = 1000 / 60;
    this.counter = 0;

    this.Laser = new Audio("/assets/laser.wav");
    this.Laser.volume = 0.2;
  }

  start() {
    this.gameScreen.style.height = this.height + "px";
    this.gameScreen.style.width = this.width + "px";

    this.startScreen.style.display = "none";
    this.gameContainer.style.display = "flex";
    this.gameScreen.style.display = "block";
    this.gameEndScreen.style.display = "none";

    this.livesElement.innerText = this.lives;
    this.scoreElement.innerText = this.score;

    this.gameIntervalId = setInterval(() => this.gameLoop(), this.gameLoopFrequency);
  }

  gameLoop() {
    this.counter++;
    this.update();

    if (this.isGameOver) {
      clearInterval(this.gameIntervalId);
      this.gameOver();
    }
  }

  update() {
    this.player.move();

    if (this.counter % 180 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen, 125, 165));
    }

    
    for (let i = 0; i < this.player.bullets.length; i++) {
      const bullet = this.player.bullets[i];
      bullet.move();

      if (bullet.top < 0) {
        bullet.element.remove();
        this.player.bullets.splice(i, 1);
        i--;
        continue;
      }

      for (let j = 0; j < this.obstacles.length; j++) {
        const obstacle = this.obstacles[j];
        if (bullet.didCollide(obstacle)) {
          bullet.element.remove();
          obstacle.element.remove();

          this.player.bullets.splice(i, 1);
          this.obstacles.splice(j, 1);

          this.score++;
          this.scoreElement.innerText = this.score;
          i--;
          break;
        }
      }
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      const currentObstacle = this.obstacles[i];
      currentObstacle.move();

      if (this.player.didCollide(currentObstacle)) {
        currentObstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;

        this.lives--;
        this.livesElement.innerText = this.lives;

        if (this.lives === 0) this.isGameOver = true;
        continue;
      }

      if (currentObstacle.top > this.height) {
        currentObstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    }
  }

  gameOver() {
    this.player.element.remove();
    this.player = null;

    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    this.obstacles = [];

    this.gameScreen.style.display = "none";
    this.gameContainer.style.display = "none";
    this.gameEndScreen.style.display = "block";
    this.startScreen.style.display = "none";
  }

  playLaser(){
    this.Laser.play();  
  }
}
