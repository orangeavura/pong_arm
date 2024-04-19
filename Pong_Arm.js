let ball;
let leftPaddle;
let rightPaddle;
let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball();
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
}

function draw() {
  background(0);
  
  // Draw center line
  drawCenterLine();
  
  // Display scores
  displayScores();
  
  // Update and display ball
  ball.update();
  ball.display();
  
  // Update and display paddles
  leftPaddle.update();
  leftPaddle.display();
  rightPaddle.update();
  rightPaddle.display();
  
  // Check for collisions
  ball.checkCollision(leftPaddle);
  ball.checkCollision(rightPaddle);
}

function touchStarted() {
  if (mouseX < width / 2) {
    if (mouseY < height / 2) {
      leftPaddle.move(-10); // Move a pá esquerda para cima
    } else {
      leftPaddle.move(10); // Move a pá esquerda para baixo
    }
  } else {
    if (mouseY < height / 2) {
      rightPaddle.move(-10); // Move a pá direita para cima
    } else {
      rightPaddle.move(10); // Move a pá direita para baixo
    }
  }
}

function touchEnded() {
  leftPaddle.move(0); // Para o movimento da pá esquerda
  rightPaddle.move(0); // Para o movimento da pá direita
}

function keyPressed() {
  // Função de controle removida, pois usaremos apenas controles de toque para dispositivos móveis
}

function keyReleased() {
  // Função de controle removida, pois usaremos apenas controles de toque para dispositivos móveis
}

function drawCenterLine() {
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < height; i += 20) {
    line(width / 2, i, width / 2, i + 10);
  }
}

function displayScores() {
  textSize(32);
  fill(255);
  text(leftScore, width / 4, 50);
  text(rightScore, width * 3 / 4, 50);
}

class Ball {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(random(-5, 5), random(-5, 5));
    this.side = 10; // Adjust the size of the square
  }
  
  update() {
    this.pos.add(this.vel);
    
    // Check for wall collisions
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }
    
    // Check for scoring
    if (this.pos.x < 0) {
      rightScore++;
      this.reset();
    } else if (this.pos.x > width) {
      leftScore++;
      this.reset();
    }
  }
  
  display() {
    fill(255);
    rectMode(CENTER); // Set rectangle mode to center
    rect(this.pos.x, this.pos.y, this.side, this.side); // Draw square
  }
  
  reset() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(random(-5, 5), random(-5, 5));
  }
  
  checkCollision(paddle) {
    // Verifica se a bola está dentro das dimensões verticais do Paddle
    if (this.pos.y > paddle.pos.y - paddle.height / 2 && this.pos.y < paddle.pos.y + paddle.height / 2) {
      // Verifica se a bola está na posição horizontal correta para colisão
      if ((paddle.isLeft && this.pos.x - this.side / 2 <= paddle.pos.x + paddle.width / 2) ||
          (!paddle.isLeft && this.pos.x + this.side / 2 >= paddle.pos.x - paddle.width / 2)) {
        this.vel.x *= -1; // Inverte a direção horizontal da bola
      }
    }
  }
}

class Paddle {
  constructor(isLeft) {
    this.width = 10;
    this.height = 70;
    this.pos = createVector(isLeft ? this.width : width - this.width, height / 2);
    this.vel = createVector(0, 0);
    this.isLeft = isLeft; // Indica se este é o Paddle da esquerda
  }
  
  update() {
    this.pos.add(this.vel);
    this.pos.y = constrain(this.pos.y, this.height / 2, height - this.height / 2);
  }
  
  display() {
    fill(255);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }
  
  move(dir) {
    this.vel.y = dir;
  }
}
