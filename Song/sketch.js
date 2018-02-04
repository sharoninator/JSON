"use strict";

var snake

var dimension = 50;
var Lines = [];

function setup(){
  snake = new Snake();
createCanvas(600,600);
// bg();

}





function draw(){
background(51);
    snake.update();
snake.show();

}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
snake.moveX(-5);
  } else if (keyCode === RIGHT_ARROW) {
snake.moveX(5);
  }
}







class Snake{
constructor(){
  this.x = 300;
  this.y = 300;
  this.d = 30;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.yEnd = 300;
  this.xEnd = 350;
}



  show(){
    fill(0,255,0 );
    strokeWeight(40);
      line(this.x,this.y,this.xEnd, this.yEnd);
  }
  moveX(getX){
this.xSpeed = getX;


  }

  moveY(getY){

this.ySpeed = getY;
  }
  update(){
    this.y+=this.ySpeed;
    this.x+=this.xSpeed;
    this.xEnd +=this.xSpeed;
    this.yEnd+=this.ySpeed;
    console.log();
  }
}
