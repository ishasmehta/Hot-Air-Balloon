var database;
var balloon;
var position;
var scaleF;

function preload(){
  bgImg = loadImage("images/Hot Air Ballon-01.png");
  balloonImg = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(800,500);

  balloon = createSprite(100, 400, 50, 50);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale = 0.4;

  database = firebase.database();
  database.ref("balloon/position").on("value",readPosition,showError);
  database.ref("balloon/scalingFactor").on("value",readScale,showError1);
}

function draw() {
  background(bgImg); 

  textSize(18);
  fill("darkblue"); 
  text("** Use arrow keys to move the Hot Air Balloon!", 20, 30);

  if(keyDown("left")){
    writePosition(-10,0);
  }
  else if(keyDown("right")){
    writePosition(10,0);
  }
  else if(keyDown("up")){
    writePosition(0,-10);
    writeScale(-0.005);
  }
  else if(keyDown("down")){
    writePosition(0,10);
    writeScale(0.005);
  }

  drawSprites();
}

function writePosition(x,y){
  database.ref("balloon/position").set({
    'x': position.x + x,
    'y': position.y + y
  });
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error while reading position from  database!");
}


function writeScale(s){
  database.ref("balloon/scalingFactor").set(scaleF+s);
}

function readScale(data){
  scaleF = data.val();
  console.log(scaleF);
  balloon.scale = scaleF;
}

function showError1(){
  console.log("Error while reading scale from  database!");
}
