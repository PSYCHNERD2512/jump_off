let board;
let boardW = 919;
let boardH = 403;
let context;

let playerW = 80;
let playerH = 180;
let playerX = 50;
let playerY = boardH - playerH;
let playerImg;
let player = {
    x: playerX,
    y: playerY,
    w: playerW,
    h: playerH,
};

let stoneH = 40;
let stoneW = 70;
let stoneX = 800;
let stoneY = boardH - stoneH;
let stoneImg;
let i = 1;
let req = 13;
let stonearr = [];

let stone_velX = 0;
let stone_velY = 0;
let gravity = 0.4;

let game_over = false;
let score = 0;
let rightPressed = false;
let leftPressed = false;

window.onload = function () {
  
    
    board = document.getElementById("board");
    board.height = boardH;
    board.width = boardW;
    context = board.getContext("2d");
    
    playerImg = new Image();
    playerImg.src = "./img/player.png";
    playerImg.onload = function () {
        context.drawImage(playerImg, player.x, player.y, player.w, player.h);
    };

    stoneImg = new Image();
    stoneImg.src = "./img/stone.png";
    
    requestAnimationFrame(update);
    setInterval(placeStone, 100);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
};

function handleKeyDown(e) {
    if (game_over) {
        resetButton = document.getElementById("reset");
        resetButton.style.visibility = "visible";
        return;
    }
    if (e.code === "Space" || e.code === "ArrowUp") {
        if (player.y === playerY) {
            stone_velY = -8;
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
    if(game_over ==true){
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
    
    context.drawImage(playerImg, player.x, player.y, player.w, player.h);
    
    for (let j = 0; j < req; j++) {
        let stone = stonearr[j];
        stone.x += stone_velX;
        context.drawImage(stone.img, stone.x, stone.y, stone.w, stone.h);

       
        context.fillStyle ="black";
        context.font = "22px bold Arial";
        context.fillText(stone.n, stone.x + stone.w / 2 - 5, stone.y + stone.h / 2 + 5);
        if(collision(player,stone)){
            game_over = true;
        }
    }
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
        };
        
        Stone.x = stoneX + ((i - 1) * 500);
        
        stonearr.push(Stone);
        i++;
    }
}


function collision(a,b){
    return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y + a.h>b.y;

}

function resetGame() {
   location.reload();
}




