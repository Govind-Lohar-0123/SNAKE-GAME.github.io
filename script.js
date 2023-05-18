let game = document.querySelector(".game");
let gc = document.querySelector(".game-container");
console.log(gc);

let f=randomValue();
let foodCord={row:f[0],col:[1]};
let speed = 4;
let lastPaintTime = 0;
let score=0;
window.requestAnimationFrame(main);
//***snake Array *****/
let row = 0;
let col = 0;

let s=randomValue();
var snakeArr = [
    { row:s[0], col:s[1] },
];

// ******randomVlaues*****

function randomValue() {
    let row = Math.floor(Math.random() * 23);
    let col = Math.floor(Math.random() * 23);
  
  return [row,col];
}

// *****CREATE SNAKE AND FOOD****
let snake;
let food;
let ready = true;
const createSnake = () => {
    game.innerHTML = "";
    snakeArr.forEach((value, index) => {
        snake = document.createElement("div");
        snake.style.gridRow = value.row;
        snake.style.gridColumn = value.col;
        if (index == 0) {
            snake.classList.add("head");

            if(row==1){
                snake.style.transform="rotate(180)";
                console.log("ddd");
            }
            else if(row==-1){
                snake.style.transform="rotate(0deg)";
            }
           else if(col==-1){
            snake.style.transform="rotate(270deg)";
            }
            else if (col==1){
                snake.style.transform="rotate(-270deg)";
            }
        }
        

        game.appendChild(snake);
    })
    createFood();


}



function createFood() {

    
    food = document.createElement("div");
    food.style.gridRow = foodCord.row;
    food.style.gridColumn = foodCord.col;
    food.classList.add("food");
    game.appendChild(food);


}

/*****MOVEMENT CONDITIONS********** */

// ******SNAKE MOVEMENT*****

function snakeMove() {
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };

    }
}

//***SNAKE MOVEMENT DIRECTION ****//

document.addEventListener("keydown", (key) => {
    key = key.keyCode;
    snakeDirMove(key);
})

function snakeDirMove(key) {
let head=document.querySelector(".head");
    switch (key) {
        case 37:
            if ((snakeArr[0].col >= 1) && (col != 1)) {
                col = -1;
                row = 0;
               
            }
            break;
        case 38:

            if ((snakeArr[0].row >= 1) && row != 1) {
                row = -1;
                col = 0;
            }
            break;
        case 39:

            if ((snakeArr[0].col <= 22) && col != -1) {
                col = 1;
                row = 0;
            }
            break;
        case 40:

            if ((row != -1) && (snakeArr[0].row <= 22)) {
                row = 1;
                col = 0;
            }
            break;
    }
}

// ********SET VALUES*****

function setValues() {
    snakeMove();
    snakeArr[0].row +=row;
    snakeArr[0].col +=col;
    boundaryCollide();
    collideSelf();
    eatFood();
}

// ****COLLIDE SELF*****

function collideSelf() {
    for (let i = 1; i < snakeArr.length; i++) {

        if (snakeArr[0].row == snakeArr[i].row && snakeArr[0].col == snakeArr[i].col) {
            gameOver();
        }
    }
}

// ****ANIMATION SPEED CONTROLS****

function main(ctime) {
    if (ready) {
        window.requestAnimationFrame(main);

        if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
            return;
        }
        lastPaintTime = ctime;
        createSnake();
        setValues();


    }

}



// ********EAT FOOD*****


function eatFood() {
   
    let sRow = snakeArr[0].row;
    let sCol = snakeArr[0].col;
    let fRow = foodCord.row;
    let fCol =foodCord.col;
    if (sRow == fRow && fCol == sCol) {
       let arr=randomValue();
       score++;
       foodCord.row=arr[0];
       foodCord.col=arr[1];
       newSnake();
       document.querySelector(".score").innerHTML=`Score ${score}`;
}
}


function newSnake(){
    let row=snakeArr[snakeArr.length-1].row;
    let col=snakeArr[snakeArr.length-1].col;
    let obj={row:row+1,col:col+1};
    snakeArr.push(obj);
}

// **************GAME OVER CONDITIONS***********

// ***BOUNDARY COLLIDE ***

function boundaryCollide() {
    let row = snakeArr[0].row;
    let col = snakeArr[0].col;
    if ((row < 1 || row > 22) || (col < 1 || col > 22)) {
        gameOver();
    }

}

// *****GAME OVER****

function gameOver() {
    ready = false;
    let gOver = document.createElement("div");
    let Restart = document.createElement("a");
    Restart.innerHTML = "Restart";
    gOver.setAttribute("class", "gameOver");
    gOver.innerHTML = "Game Over";
    gc.appendChild(gOver);
    gc.appendChild(Restart);
    restart();
}

// *****RESTART BTN*****
function restart() {
    document.querySelector("a").addEventListener("click", () => {
        window.location.reload();
    })
}

/******** INCREASE SNAKE **********/

function increaseSnake() {

}
