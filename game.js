const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let paddleHeight = 75, paddleWidth = 10, paddleY = (canvas.height - paddleHeight) / 2;
let ballRadius = 10, x = canvas.width / 2, y = canvas.height / 2;
let dx = 2, dy = 2;
let score = 0, highScore = 0;
let upPressed = false, downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "Up" || e.key === "ArrowUp") upPressed = true;
  else if (e.key === "Down" || e.key === "ArrowDown") downPressed = true;
}

function keyUpHandler(e) {
  if (e.key === "Up" || e.key === "ArrowUp") upPressed = false;
  else if (e.key === "Down" || e.key === "ArrowDown") downPressed = false;
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(0, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();

  if (upPressed && paddleY > 0) paddleY -= 7;
  else if (downPressed && paddleY < canvas.height - paddleHeight) paddleY += 7;

  if (x + dx < ballRadius + paddleWidth && y > paddleY && y < paddleY + paddleHeight) {
    dx = -dx;
    score++;
    document.getElementById("score").textContent = score;
    if (score > highScore) {
      highScore = score;
      document.getElementById("highScore").textContent = highScore;
    }
  } else if (x + dx < 0) {
    clearInterval(gameInterval);
    document.getElementById("gameOver").style.display = "block";
  }

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) dy = -dy;

  x += dx;
  y += dy;
}

let gameInterval = setInterval(draw, 10);
