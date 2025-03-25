let leftPaddle, rightPaddle, ball;
let leftScore = 0, rightScore = 0;
let winningScore = 10;

function setup() {
  createCanvas(800, 400);
  leftPaddle = new Paddle(20, height / 2 - 50);
  rightPaddle = new Paddle(width - 40, height / 2 - 50);
  ball = new Ball();
}

//PELOTA
function draw() {
  background(0);

  leftPaddle.display();
  rightPaddle.display();
  leftPaddle.move();
  rightPaddle.move();

  ball.display();
  ball.update();
  ball.checkEdges();
  ball.checkPaddleCollision(leftPaddle);
  ball.checkPaddleCollision(rightPaddle);

  textSize(32);
  fill(255);
  text(leftScore, width / 4, 50);
  text(rightScore, 3 * width / 4, 50);
  
  if (leftScore === winningScore || rightScore === winningScore) {
    noLoop();
    textSize(64);
    let winner = leftScore === winningScore ? "Jugador 1 gana!" : "Jugador 2 gana!";
    text(winner, width / 4, height / 2);
  }
}

//MOVIMIENTOS
function keyPressed() {
  if (key === 'w' || key === 'W') {
    leftPaddle.setDirection(-1);
  } else if (key === 's' || key === 'S') {
    leftPaddle.setDirection(1);
  }
  

  if (keyCode === UP_ARROW) {
    rightPaddle.setDirection(-1);
  } else if (keyCode === DOWN_ARROW) {
    rightPaddle.setDirection(1);
  }
}

function keyReleased() {
  leftPaddle.setDirection(0);
  rightPaddle.setDirection(0);
}

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 100;
    this.yDirection = 0;
    this.speed = 5;
  }
  
  display() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
  
  setDirection(dir) {
    this.yDirection = dir;
  }
  
  move() {
    this.y += this.yDirection * this.speed;
    this.y = constrain(this.y, 0, height - this.height);
  }
}

class Ball {
  constructor() {
    this.reset();
  }
  
  //DIRECCION
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.diameter = 20;
    this.xSpeed = random() > 0.5 ? 5 : -5;
    this.ySpeed = random(-3, 3);
  }
  
  display() {
    fill(255);
    ellipse(this.x, this.y, this.diameter);
  }
  
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  
  checkEdges() {
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
    
    //PUNTUACION
    if (this.x < 0) {
      rightScore++;
      this.reset();
    } else if (this.x > width) {
      leftScore++;
      this.reset();
    }
  }
  
  checkPaddleCollision(paddle) {
    if (this.x - this.diameter/2 < paddle.x + paddle.width &&
        this.x + this.diameter/2 > paddle.x &&
        this.y + this.diameter/2 > paddle.y &&
        this.y - this.diameter/2 < paddle.y + paddle.height) {
      this.xSpeed *= -1;
      this.xSpeed *= 1.05;
      this.ySpeed *= 1.05;
    }
  }
}
