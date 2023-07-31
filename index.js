const startBtn = document.getElementById('start-btn');
let gameRunning = false;
const jumpHeight = 80; // The height the player jumps
const jumpSpeed = 5; // The speed of the player's jump

let jumpCooldown = false;

const player = {
  x: 0,
  y: 7,
  size: 14,
};

startBtn.addEventListener('click', function () {
  gameRunning = !gameRunning;
  if (gameRunning) {
    startBtn.textContent = "Retry";
    Rungame();
  } else {
    startBtn.textContent = "Start";
    Restartgame();
  }
});

const board = document.getElementById("game-screen");
const context = board.getContext("2d");

// Load the images
const images = {
  arrow1: new Image(),
  arrow2: new Image(),
  arrow3: new Image(),
  arrow_rev: new Image(),
  arrow_rev2: new Image(),
  final: new Image()
};

images.arrow1.src = "./assets/line.png";
images.arrow2.src = "./assets/line.png";
images.arrow3.src = "./assets/line.png";
images.arrow_rev.src = "./assets/reverse.png";
images.arrow_rev2.src = "./assets/reverse2.png";
images.final.src = "./assets/final.png";

images.arrow1.onload = drawArrows;
images.arrow2.onload = drawArrows;
images.arrow3.onload = drawArrows;
images.arrow_rev.onload = drawArrows;
images.arrow_rev2.onload = drawArrows;
images.final.onload = drawArrows;

function drawBoxes(x, y, count) {
  const boxSize = 12;
  const margin = 180 / count;

  for (let i = 0; i < count; i++) {
    context.fillStyle = "black";
    context.fillRect(x + (boxSize + margin) * i + (100 / count), y - 60, boxSize, boxSize);
  }
}

function drawPlayer() {
  context.fillStyle = "blue";
  context.fillRect(player.x, player.y, player.size, player.size);
}

function drawArrows() {
  context.clearRect(0, 0, board.width, board.height);
  context.drawImage(images.arrow1, 0, -124, 280, 300);
  context.drawImage(images.arrow2, 10, -83, 280, 300);
  context.drawImage(images.arrow3, 10, -45, 280, 300);
  context.drawImage(images.arrow_rev, 270, 10, 30, 80);
  context.drawImage(images.arrow_rev2, 0, 50, 30, 80);
  context.drawImage(images.final, 284, 75, 20, 40);
  drawBoxes(30, 70, 4);
  drawBoxes(40, 110, 3);
  drawBoxes(40, 150, 5);
  drawPlayer();
}

function handleKeyDown(event) {
  if (gameRunning) {
    const speed = 5;

    switch (event.key) {
      case "ArrowLeft":
        player.x -= speed;
        break;
      case "ArrowRight":
        player.x += speed;
        break;
      case "ArrowUp":
       
          jump();
        
        break;
    }

    drawArrows();
  }
}

function jump() {
 
  

  function updateJump() {
    if (jumpCount < jumpHeight) {
      player.y -= jumpSpeed;
      jumpCount += jumpSpeed;
    } else {
      clearInterval(jumpInterval);
      jumpCooldown = true;
      setTimeout(() => {
        isJumping = false;
        jumpCooldown = false;
      }, 500);
    }

    drawArrows();
  }

  const jumpInterval = setInterval(updateJump, 10);
}

function movePlayerToNextArrow() {
  const arrowDistance = 40;
  player.y += arrowDistance;
}

function Rungame() {
  console.log('Game is running!');
}

function Restartgame() {
  console.log('Game is restarting!');
  document.location.reload();
}

window.addEventListener("keydown", handleKeyDown);
