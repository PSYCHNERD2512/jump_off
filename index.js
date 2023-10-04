var parentVar = 'points';

let board;
let boardW = 919;
let boardH = 403;
let context;

let playerW = 595/5;
let playerH = 472/5;
let playerX = 50;
let playerY = boardH - playerH - 30;
let playerImg;
let player = {
  x: playerX,
  y: playerY,
  w: playerW,
  h: playerH,
  animationFrames: [],
};

let pointLabel = {
  x: 0,
  y: 0,
  text: "",
  opacity: 1.0,
};

let wrongLabel = {
  x: 0,
  y: 0,
  text: "",
  opacity: 1.0,
};




let points = 0;

let stoneH = 231/4;
let stoneW = 241/4;
let stoneX = 650;
let stoneY = boardH - stoneH - 20;
let stoneImg;
let stoneWImg;
let stoneCImg;
let i = 1;
let req = 12;
let stonearr = [];
let corr_stone = [1, 3, 4, 6, 8, 10, 12]; //Tweak this array according to your expected answers.
let stoneCount = 0;

let stone_velX = 0;
let stone_velY = 0;
let gravity = 0.45;

let game_over = false;
let score = 0;
let rightPressed = false;
let leftPressed = false;

let animationFrameInterval = 200;

var corr_audio = new Audio('./audio/correct.mp3');
var wrong_audio = new Audio('./audio/wrong.mp3');

let playerMaster;
let initScore;





// load function
window.onload = function () {
  updateBtn(1);
  board = document.getElementById('board');
  board.height = boardH;
  board.width = boardW;
  context = board.getContext('2d');

  if (window.parent && window.parent.GetPlayer) {
    playerMaster = window.parent.GetPlayer();
    console.log('Player loaded');
    if (playerMaster) {
      initScore = playerMaster.GetVar(parentVar);
    }
  }


 

  stoneImg = new Image();
  stoneImg.src = './4x/Asset 58@4x-8.png';
  stoneWImg = new Image();
  stoneCImg = new Image();
  stoneCImg.src = './4x/stoneC.png'
  stoneWImg.src = './4x/stoneW.png';

  requestAnimationFrame(update);
  setInterval(placeStone, 100);
  setInterval(loadAnimationFrames(1), animationFrameInterval);
};



// handle key down

function handleKeyDown(e) {
  if (game_over) {
    return;
  }
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    if (player.y === playerY) {
      stone_velY = -10;
    }
  }
  if (e.code === 'ArrowRight') {
    rightPressed = true;
  }
  if (game_over) {
    return;
  }
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    if (player.y === playerY) {
      stone_velY = -10;
    }
  }
  if (e.code === 'ArrowRight') {
    rightPressed = true;
  }
}

function handleKeyUp(e) {
  if (e.code === 'ArrowRight') {
    rightPressed = false;
  }
  if (e.code === 'ArrowLeft') {
    leftPressed = false;
  }
}





// update function
function update() {
  if (game_over) {
    return;
  }

  requestAnimationFrame(update);
  context.clearRect(0, 0, boardW, boardH);

  stone_velY += gravity;
  player.y = Math.min(player.y + stone_velY, playerY);

  if (rightPressed) {
    stone_velX = -15;
  } else if (leftPressed) {
    stone_velX = 10;
  } else {
    stone_velX = 0;
  }

  if (rightPressed || leftPressed) {
    playerImg =
      player.animationFrames[
        Math.floor(Date.now() / 100) % player.animationFrames.length
      ];
  } else {
    playerImg = player.animationFrames[0];
  }

  context.save();
  if (stone_velX > 0) {
    context.drawImage(playerImg, player.x, player.y, player.w, player.h);
  } else {
    context.scale(+1, 1);
    context.drawImage(
      playerImg,
      +player.x + player.w,
      player.y,
      player.w,
      player.h
    );
  }
  context.restore();

  for (let j = 0; j < req; j++) {
    let stone = stonearr[j];
    stone.x += stone_velX;

    context.drawImage(stone.img, stone.x, stone.y, stone.w, stone.h);

    context.fillStyle = 'black';
    context.font = '22px bold Arial';
    // context.fillText(
    //   stone.n,
    //   stone.x + stone.w / 2 - 5,
    //   stone.y + stone.h / 2 + 5
    // );

    if (
      player.x + player.w > stone.x &&
      player.x < stone.x + stone.w &&
      player.y + player.h > stone.y &&
      player.y < stone.y + stone.h &&
      stone.collected == false
    ) {
      if (corr_stone.includes(stone.n)) {
        increasePoint(stone.x,stone.y-stone.h - 10);
        score += 2;
        stone.collected = true;
        
        
        stone.img = stoneCImg;
        corr_audio.volume = 0.1;

          corr_audio.play();
         
   
document.getElementById('btn'+stone.n).classList.add('correct-answer');



        
      } else {
        reducePoint(stone.x,stone.y-stone.h - 10);
        score--;
        
        stone.img = stoneWImg;
        
        stone.collected = true;
        wrong_audio.volume = 0.1;

          wrong_audio.play();
          document.getElementById('btn'+stone.n).classList.add('wrong-answer');
          

      }
      context.fillStyle = 'black';
      context.font = '22px bold Arial';
      context.fillText(
        stone.n,
        stone.x + stone.w / 2 - 5,
        stone.y + stone.h / 2 + 5
      );

      
    }
  }

  displayPoints();
  frameF();

  if (
    (-100 < stonearr[req - 1].x < 0 || stonearr[req - 1].x < -220) &&
    player.y == playerY
  ) {
    setTimeout(function() {
      game_over = true;
    }, 1000);
    return;
  }
}



// place stone

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

    Stone.x = stoneX + (i - 1) * 800;
    Stone.x = stoneX + (i - 1) * 1000;

    stonearr.push(Stone);
    i++;
  }
}




// display points
function displayPoints() {
  let scoreImg = new Image();
  scoreImg.src = './4x/score.png'; 
    context.drawImage(scoreImg, 850, 10, 60, 64);
    context.fillStyle = 'white';
    context.font = '22px bold Arial';
    context.fillText(score, 875, 38); 
  };



function resetGame() {
  location.reload();
}


// load animation frames

function loadAnimationFrames(i) {
  const numFrames = 7;
  if (i <= numFrames) {
    let frameImg = new Image();
    frameImg.src = `./4x/bot.png`;
    player.animationFrames.push(frameImg);
    i++;
    loadAnimationFrames(i);
  }
}



// start game
function startGame() {
  const startButton = document.getElementById('start');
  startButton.style.display = 'none';

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  submitButton = document.getElementById('submit');
  
  submitButton.style.visibility = 'visible';

}


// submit function
function submit() {
  

  if (playerMaster) playerMaster.SetVar(parentVar, initScore + score);
  const overlay = document.getElementById('overlay');
  submitButton = document.getElementById('submit');
  
  submitButton.style.visibility = 'hidden';
  
  resetButton = document.getElementById('reset');
  resetButton.style.visibility = 'visible';
  
    overlay.style.display = 'flex';
    

  
    const finalPoints = document.getElementById('finalPoints');
    finalPoints.textContent = `${score}`;

}




// update button
function updateBtn(count) {
  let styleElement = document.getElementById('customStyles');
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'customStyles';
    document.head.appendChild(styleElement);
  }
  if(count !== 2){
  const cssRules = `
        #btn${count}::after { 
            content: "";
            position: absolute;
            top: 0;
            width: 162px;
            height: 50px;
            left: 0px;
            top:0px;
            background-image: url("./4x/sel.png");
            background-size: cover;
            background-position: center;
            z-index: 1;
        }
    `;
    

  styleElement.innerHTML = cssRules;}
  else{
    const cssRules = `
        #btn${count}::after { 
            content: "";
            position: absolute;
            top: 0;
            width: 162px;
            height: 50px;
            left: 0px;
            top:-5px;
            background-image: url("./4x/sel.png");
            background-size: cover;
            background-position: center;
            z-index: 1;
        }
    `;
    

  styleElement.innerHTML = cssRules;
    
  }
      
}


// frame function
function frameF() {
  stoneCount = 1;

  for (let numb = 0; numb < req; numb++) {
    if (stonearr[numb].x < 0) {
      stoneCount += 1;
    }
  }

  updateBtn(stoneCount);
}




// increase point
function increasePoint(x, y) {

  pointLabel.x = x;
  pointLabel.y = y;
  pointLabel.text = "+2";
  pointLabel.opacity = 1.0; 

 
  requestAnimationFrame(animatePointLabel);
}



// animate the point label
function animatePointLabel() {
  if (pointLabel.opacity > 0) {
    context.clearRect(pointLabel.x - 10+30, pointLabel.y - 30, 50, 30); 
    context.fillStyle = `rgba(255, 255, 255, ${pointLabel.opacity})`;
    context.font = "24px bold Arial";
    context.fillText(pointLabel.text, pointLabel.x+30, pointLabel.y);

    pointLabel.y -= 1;
    pointLabel.opacity -= 0.02;

    requestAnimationFrame(animatePointLabel);
  }
}




// reduce point
function reducePoint(x, y) {
 
  wrongLabel.x = x;
  wrongLabel.y = y;
  wrongLabel.text = "-1";
  wrongLabel.opacity = 1.0; 

  
  requestAnimationFrame(animateWrongLabel);
}




// animate the wrong label
function animateWrongLabel() {
  if (wrongLabel.opacity > 0) {
    context.clearRect(pointLabel.x - 10+30, pointLabel.y - 30, 50, 30); 
    context.fillStyle = `rgba(255, 0, 0, ${wrongLabel.opacity})`;
    context.font = "24px bold Arial";
    context.fillText(wrongLabel.text, wrongLabel.x+30, wrongLabel.y);

    
    wrongLabel.y -= 1; 
    wrongLabel.opacity -= 0.02; 

    requestAnimationFrame(animateWrongLabel);
  }
}














