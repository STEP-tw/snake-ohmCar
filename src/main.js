let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const actionsAfterGameOver=function(){
  let restartButton=document.getElementById('restart');
  restartButton.style.visibility='visible';
  restartButton.onclick=function(){location.reload();};
  document.getElementById('grid').innerText='Game Over';
};

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  if(head.y==-1&&head.direction=="north"){
    actionsAfterGameOver();
  };
  if(head.x==-1&&head.direction=="west"){
    actionsAfterGameOver();
  };
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
    snake.turnLeft();
    break;
    case "KeyD":
    snake.turnRight();
    break;
    case "KeyC":
    snake.grow();
    break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  document.getElementById('restart').style.visibility='hidden';
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
