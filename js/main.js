const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let size = Math.min(window.innerWidth - 20, 400);

canvas.width = size;
canvas.height = size;

const box = size / 20;

let snake = [
    {
        x:box * 10,
        y:box * 10
    }
];

let food = {
    x:Math.floor(Math.random()*20)*box,
    y:Math.floor(Math.random()*20)*box
};

let direction = "right";
let score = 0;
let speed = 250;
let eatEffect = 0;

function draw(){

    ctx.clearRect(0,0,size,size);

    ctx.fillStyle="#111";
    ctx.fillRect(0,0,size,size);

    if(eatEffect > 0){
        eatEffect--;
        ctx.shadowBlur = 25;
        ctx.shadowColor = "yellow";
    }else{
        ctx.shadowBlur = 0;
    }

    ctx.fillStyle="red";
    ctx.beginPath();
    ctx.arc(
        food.x + box/2,
        food.y + box/2,
        box/3,
        0,
        Math.PI*2
    );
    ctx.fill();

    ctx.shadowBlur = 0;

    for(let i=0;i<snake.length;i++){

        ctx.fillStyle =
        i===0 ? "#00ff00" : "#66ff66";

        ctx.beginPath();
        ctx.arc(
            snake[i].x + box/2,
            snake[i].y + box/2,
            box/2 - 2,
            0,
            Math.PI*2
        );
        ctx.fill();
    }

    let headX = snake[0].x;
    let headY = snake[0].y;

    if(direction==="left") headX -= box;
    if(direction==="right") headX += box;
    if(direction==="up") headY -= box;
    if(direction==="down") headY += box;

if(headX < 0) headX = size - box;
if(headX >= size) headX = 0;

if(headY < 0) headY = size - box;
if(headY >= size) headY = 0;

    for(let i=1;i<snake.length;i++){
        if(
            headX===snake[i].x &&
            headY===snake[i].y
        ){
            gameOver();
            return;
        }
    }

    let newHead = {
        x:headX,
        y:headY
    };

if(
    Math.round(headX) === Math.round(food.x) &&
    Math.round(headY) === Math.round(food.y)
){

        score++;
        eatEffect = 10;

        document.getElementById("score").innerHTML =
        "Score: " + score;

        food = {
            x:Math.floor(Math.random()*20)*box,
            y:Math.floor(Math.random()*20)*box
        };

        if(speed > 60){
            speed -= 5;
            startLoop();
        }

    }else{
        snake.pop();
    }

    snake.unshift(newHead);
}

function gameOver(){

    if(navigator.vibrate){
        navigator.vibrate([200,100,200]);
    }

    alert("💀 Game Over\nScore: " + score);

    snake = [{
        x:box * 10,
        y:box * 10
    }];

    direction = "right";
    score = 0;
    speed = 140;

    document.getElementById("score").innerHTML =
    "Score: 0";

    startLoop();
}

function changeDir(dir){

    if(dir==="left" && direction!=="right")
        direction="left";

    if(dir==="right" && direction!=="left")
        direction="right";

    if(dir==="up" && direction!=="down")
        direction="up";

    if(dir==="down" && direction!=="up")
        direction="down";
}

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowLeft") changeDir("left");
    if(e.key==="ArrowRight") changeDir("right");
    if(e.key==="ArrowUp") changeDir("up");
    if(e.key==="ArrowDown") changeDir("down");
});

function startLoop(){

    clearInterval(window.gameLoop);

    window.gameLoop =
    setInterval(draw,speed);
}

document.getElementById("playBtn").onclick = function(){

    document.getElementById("startScreen").style.display = "none";

    startLoop();
    document.getElementById("upBtn").addEventListener("touchstart", e=>{
    e.preventDefault();
    changeDir("up");
});

document.getElementById("downBtn").addEventListener("touchstart", e=>{
    e.preventDefault();
    changeDir("down");
});

document.getElementById("leftBtn").addEventListener("touchstart", e=>{
    e.preventDefault();
    changeDir("left");
});

document.getElementById("rightBtn").addEventListener("touchstart", e=>{
    e.preventDefault();
    changeDir("right");
});
};