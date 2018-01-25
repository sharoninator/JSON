"use strict";


var x = 0;
var img;
var ship
var Lasers = [];
var lasernum = 0;
var shot = false;
function preload(){
    img = loadImage("ship.png");
}
function setup(){
  createCanvas(600,600);
ship = new Spaceship();

}
function draw(){
  background(51);
if(shot){
fill(255, 94, 0);
for(var i=1;i<=lasernum;i++){
  console.log(Lasers[i].initY)
    Lasers[i].initY+=Lasers[i].ySpeed;
rect(Lasers[i].initX,Lasers[i].initY,10,40)
}

}
ship.show();
if(keyIsDown(LEFT_ARROW)){
  ship.moveX(-5);
}
if(keyIsDown(RIGHT_ARROW)){
  ship.moveX(5);
}
if(keyIsDown(UP_ARROW)){
  ship.moveY(-5);
}
if(keyIsDown(DOWN_ARROW)){
  ship.moveY(5);
}



}

function keyPressed(){
if(keyCode === 32){
ship.shoot(ship.x, ship.y);
}

}

class Laser{
  constructor(initX,initY){
    this.initX = initX;
    this.initY = initY;
    this.ySpeed = -5;
    shot = true;
  }

}



class Spaceship{
  constructor(){

      this.x = 200;
      this.y = 200
  }
  shoot(initX,initY){
lasernum++;
Lasers[lasernum] = new Laser(initX,initY);


  }

  moveX(xSpeed){

      this.xSpeed=xSpeed;
  this.x+=this.xSpeed;
  }


  moveY(ySpeed){
    this.ySpeed=ySpeed;
this.y+=this.ySpeed;
  }
  show(){
    this.edges();
  image(img,this.x,this.y, img.width/4, img.height/4);
  this.initY++;
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
