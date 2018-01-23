"use strict";


var x = 0;
var img;
var ship;
function preload(){
    img = loadImage("ship.png");
}
function setup(){
  createCanvas(600,600);
ship = new Spaceship();

}
function draw(){
  background(51);
ship.show();
}

function keyReleased(){
  ship.moveX(0);
  ship.moveY(0);
}
function keyPressed(){
  if (keyCode === LEFT_ARROW) {
    ship.moveX(-5);
  }
    if (keyCode === RIGHT_ARROW) {
      ship.moveX(5);
}

  if (keyCode === UP_ARROW) {
ship.moveY(-5);
}
  if (keyCode === DOWN_ARROW) {
ship.moveY(5);

}
}



class Spaceship{
  constructor(){

      this.x = 200;
      this.y = 200

  }
  show(){
    this.edges();
  image(img,this.x,this.y, img.width/4, img.height/4);
  }
  moveX(xSpeed){

      this.xSpeed=xSpeed;
  this.x+=this.xSpeed;
  }


  moveY(ySpeed){
    this.ySpeed=ySpeed;
this.y+=this.ySpeed;
  }
  edges(){
    if(this.x > width - img.width/4){
      this.x = width - img.width/4;
    }

      if(this.x < 0){
        this.x = 0;
      }

        if(this.y > height - img.width / 4 + 20){
          this.y = height - img.width/4 + 20  ;
        }

          if(this.y < 0){
            this.y = 0;
          }
  }

}
