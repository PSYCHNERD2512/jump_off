let board;
let boardW = 919;
let boardH = 403;
let context;

let playerW = 632/8;
let playerH = 1638/8;
let playerX = 50;
let playerY = boardH - playerH;
let playerImg;
let player = {
    x: playerX,
    y: playerY,
    w: playerW,
    h: playerH,
    animationFrames: [],
};

let points = 0;

let stoneH = 40;
let stoneW = 70;
let stoneX = 800;
let stoneY = boardH - stoneH;
let stoneImg;
let stoneWImg;
let i = 1;
let req = 12;
let stonearr = [];
let corr_stone = [1,3,4,6,8,10,12];//Tweak this array according to your expected answers.

let stone_velX = 0;
let stone_velY = 0;
let gravity = 0.4;

let game_over = false;
let score = 0;
let rightPressed = false;
let leftPressed = false;

let animationFrameInterval = 200; 

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardH;
    board.width = boardW;
    context = board.getContext("2d");

    const numFrames = 7;
    playerImg = new Image();
    
    playerImg.src = "./img/player1.png";
    
    player.animationFrames = [];
    for (let frame = 1; frame <= numFrames; frame++) {
        let num = numFrames - frame+1;
        const frameImg = new Image();
        frameImg.src = `./img/player${num}.png`;
        player.animationFrames.push(frameImg);
        
    }

    stoneImg = new Image();
    stoneImg.src = "./img/stone.png";
    stoneWImg = new Image();
    stoneWImg.src = "./img/stoneW.png";

    requestAnimationFrame(update);
    setInterval(placeStone, 100);
    setInterval(loadAnimationFrames, animationFrameInterval);

};

function handleKeyDown(e) {
    if (game_over) {
        
        return;
    }
    if (e.code === "Space" || e.code === "ArrowUp") {
        if (player.y === playerY) {
            stone_velY = -10;
        }
    }
    if (e.code === "ArrowRight") {
        rightPressed = true;
    }
    if (e.code === "ArrowLeft") {
        leftPressed = true;
    }
}

function handleKeyUp(e) {
    if (e.code === "ArrowRight") {
        rightPressed = false;
    }
    if (e.code === "ArrowLeft") {
        leftPressed = false;
    }
}

function update() {
    if (game_over == true) {
        return;
    }
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardW, boardH);

    stone_velY += gravity;
    player.y = Math.min(player.y + stone_velY, playerY);

    if (rightPressed) {
        stone_velX = -12;
    } else if (leftPressed) {
        stone_velX = 10;
    } else {
        stone_velX = 0;
    }

    if (rightPressed || leftPressed) {
        playerImg = player.animationFrames[Math.floor(Date.now() / 100) % player.animationFrames.length];
    } else {
        playerImg = player.animationFrames[0];
    }

    context.save();
    if (stone_velX > 0) {
        context.drawImage(playerImg, player.x, player.y, player.w, player.h);
    } else {
        context.scale(-1, 1);
        context.drawImage(playerImg, -player.x - player.w, player.y, player.w, player.h);
    }
    context.restore();

    for (let j = 0; j < req; j++) {
        let stone = stonearr[j];
        stone.x += stone_velX;

        context.drawImage(stone.img, stone.x, stone.y, stone.w, stone.h);

        context.fillStyle = "black";
        context.font = "22px bold Arial";
        context.fillText(stone.n, stone.x + stone.w / 2 - 5, stone.y + stone.h / 2 + 5);
        
        if (
            player.x + player.w > stone.x &&
            player.x < stone.x + stone.w &&
            player.y + player.h > stone.y &&
            player.y < stone.y + stone.h&& stone.collected ==false
        ) {
            if (corr_stone.includes(stone.n)) {
                score+=2;
                stone.collected = true;
                stone.x -=200000000;
            } else  {
                score--;
                stone.img = stoneWImg;
                stone.collected= true;
            }
            
        }
    
    }
    const lastStone = stonearr[req - 1];

    if (lastStone.x + lastStone.w+200< player.x) {
        resetButton = document.getElementById("reset");
        resetButton.style.visibility = "visible";
    }
    

    displayPoints();
}

function placeStone() {
    if (i <= req) {
        let Stone = {
            x: null,
            y: stoneY,
            n: i,
            img: stoneImg,
            h: stoneH,
            w: stoneW,
            collected: false,
        };

        Stone.x = stoneX + ((i - 1) * 600);

        stonearr.push(Stone);
        i++;
    }
}

function displayPoints() {
    context.fillStyle = "white";
    context.font = "22px bold Arial";
    context.fillText("Score: " + score, 10, 30);
}


function resetGame() {
    location.reload();
}

function loadAnimationFrames() {
    if (i <= numFrames) {
        let frameImg = new Image();
        frameImg.src = `./img/player${i}.png`;
        player.animationFrames.push(frameImg);
        i++;
    }
}
function startGame() {
    const startButton = document.getElementById("start");
    startButton.style.display = "none"; 

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    resetButton = document.getElementById("reset");
        resetButton.style.visibility = "visible";
}
function submit() {
    
}
