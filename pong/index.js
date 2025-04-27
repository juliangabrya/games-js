const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 2;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
};

function bounceSound(){
        var bounceSound = new Howl({
            src: ['bounce.wav'],
            volume: 100,
        });
        bounceSound.play();


}

//window.addEventListener("keydown", changeDirection);

setTimeout(loop, 100)

resetBtn.addEventListener("click", resetGame);

gameStart();
drawPaddles();

function gameStart(){
    createBall();
    nextTick()

};
function nextTick(){
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX,ballY);
        checkCollision();
        nextTick();
    },10)
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function drawPaddles(){
    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
    ctx.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);

    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
    ctx.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
};
function createBall(){
    ballSpeed=1
    if(Math.round(Math.random()) == 1 ){
        ballXDirection = 1
    }
    else{
        ballXDirection = -1
    }
    if(Math.round(Math.random()) == 1 ){
        ballYDirection = 1
    }
    else{
        ballYDirection = -1
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY)
};
function moveBall(){
    ballX+=(ballSpeed*ballXDirection)
    ballY+=(ballSpeed*ballYDirection)

};
function drawBall(ballX,ballY){
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX,ballY,ballRadius,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();
};
function checkCollision(){
    if(ballY <= 0 +ballRadius){
        ballYDirection *= -1;
        bounceSound()
    }
    if(ballY >= gameHeight - ballRadius){
        ballYDirection *= -1;
        bounceSound()
    }
    if(ballX <= 0){
        player2Score+=1
        updateScore();
        createBall();
        return;
    }
    if(ballX >= gameWidth){
        player1Score+=1
        updateScore();
        createBall();
        return;
    }
    if(ballX <= (paddle1.x+paddle1.width+ballRadius)){
        if(ballY > paddle1.y && ballY < paddle1.y+paddle1.height){
            ballX=(paddle1.x + paddle1.width) + ballRadius;
            ballXDirection *= -1;
            ballSpeed += 1;
            bounceSound()
        }
    }

    if(ballX >= (paddle2.x-ballRadius)){
        if(ballY > paddle2.y && ballY < paddle2.y+paddle2.height){
            ballX= paddle2.x - ballRadius;
            ballXDirection *= -1;
            ballSpeed += 1;
            bounceSound()
        }
    }
};
function loop(){
//    console.log("keys down", keys)
    changeDirection(keys)
    setTimeout(loop, 1)
}

function changeDirection(keys){
    const paddle1Up = 'w';
    const paddle1Down = 's';
    const paddle2Up = 'ArrowUp';
    const paddle2Down = 'ArrowDown';


        if ( keys[paddle1Up] ){
            if(paddle1.y > 0){
                paddle1.y -= paddleSpeed
            }
        }
        if(keys[paddle1Down]){
            if(paddle1.y < gameHeight-paddle1.height){
                paddle1.y += paddleSpeed
            }
        }

        if ( keys[paddle2Up] ){
            if(paddle2.y > 0){
                paddle2.y -= paddleSpeed
            }
        }
        if(keys[paddle2Down]){
            if(paddle2.y < gameHeight-paddle2.height){
                paddle2.y += paddleSpeed
            }
        }
};
function updateScore(){
scoreText.textContent = `${player1Score} : ${player2Score}`



};
function resetGame(){
    player1Score = 0;
    player2Score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    };
    ballSpeed=1
    ballX=0;
    ballY=0;
    ballXDirection=0;
    ballYDirection=0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
};

let keys = {};

document.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  delete keys[event.key];
});
