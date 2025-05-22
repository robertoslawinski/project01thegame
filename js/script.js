window.onload = () => {
 
  document.getElementById("game-end").style.display = "none";
  document.getElementById("game-container").style.display = "none";
  document.getElementById("game-screen").style.display = "none";

  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let ourGame = null;
  startButton.addEventListener("click", () => startGame());
  restartButton.addEventListener("click", () => startGame());

  function startGame() {
    if (ourGame) clearInterval(ourGame.gameIntervalId);
    ourGame = new Game();
    ourGame.start();
  }

  window.addEventListener("keydown", (event) => {
    if (!ourGame || !ourGame.player) return;

    switch (event.code) {
      case "ArrowLeft":
        ourGame.player.directionX = -3;
        break;
      case "ArrowRight":
        ourGame.player.directionX = 3;
        break;
      case "ArrowUp":
        ourGame.player.directionY = -3;
        break;
      case "ArrowDown":
        ourGame.player.directionY = 3;
        break;
      case "Space":
        const bulletX = ourGame.player.left + ourGame.player.width / 2 - 10;
        const bulletY = ourGame.player.top;
        const bullet = new Bullet(ourGame.gameScreen, bulletX, bulletY);
        ourGame.player.bullets.push(bullet);
        ourGame.playLaser(); 
        break;
       

    }
  });

  window.addEventListener("keyup", (event) => {
    if (!ourGame || !ourGame.player) return;

    if (["ArrowLeft", "ArrowRight"].includes(event.code)) {
      ourGame.player.directionX = 0;
    }
    if (["ArrowUp", "ArrowDown"].includes(event.code)) {
      ourGame.player.directionY = 0;
    }
  });
};
