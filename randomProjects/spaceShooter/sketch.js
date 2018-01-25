"use strict";
//SPACE SHOOTER!!!!
//By gorgamite
var Asteroids = [];
var x = 0;
var img;
var ship
var Lasers = [];
var laserNum = 0;
var shot = false;
var pic;
var heart;
var maxAsteroids = 20;
var numOfAsteroids = 5;
var lives = 3;
var invincible= 0;
function preload() {
    img = loadImage("ship.png");
    pic = loadImage("asteroid.png");
    heart = loadImage("heart.png");
}
function setup() {
    createCanvas(600, 600);
    ship = new Spaceship();
    for(var i=1;i<=maxAsteroids;i++){
      Asteroids[i] = new Asteroid();
    }
}

function draw() {
    background(51);
for(var j=1;j<=numOfAsteroids;j++){
    Asteroids[j].update();
  Asteroids[j].show();
      Asteroids[j].hit();

if(invincible<=0){
  Asteroids[j].hitShip();
} else{
  invincible--;
}
      // ellipse(Asteroids[j].x,Asteroids[j].y,10)
}
// ellipse(ship.x,ship.y,10);
if(shot){
  Lasers[laserNum].fired();
  for(var k=1;k<=laserNum;k++){
    Lasers[k].checkAsteroid();

  }
}
    ship.show();


    if (keyIsDown(LEFT_ARROW)) {
        ship.moveX(-5);
    }
    if (keyIsDown(RIGHT_ARROW)) {
        ship.moveX(5);
    }
    if (keyIsDown(UP_ARROW)) {
        ship.moveY(-5);
    }
    if (keyIsDown(DOWN_ARROW)) {
        ship.moveY(5);
    }



}
function keyPressed() {
    if (keyCode === 32) {
        ship.shoot(ship.x, ship.y);
    }

}



class Asteroid{
constructor(){
  this.x = random(20,550);
  this.y  = 0 - random(pic.height/6,pic.height/6+pic.height);
  this.ySpeed = random(3,4);
  this.xSpeed = 0;
  this.cooldown = 0;
}

update(){
  this.y+=this.ySpeed;
  this.x+=this.xSpeed;
}

hit(i){
if(this.y>height+random(pic.height/6,pic.height/6+pic.height) || this.cooldown===1){
  console.log(this.cooldown + " - " + this);
  this.cooldown = 0;
  this.y = 0- random(pic.height/6,pic.height/6+pic.height);
  this.x = random(20,550);
  this.ySpeed = random(3,4.5);
  this.xSpeed = 0;
}
}
hitShip(){

  if(dist(this.x,this.y,ship.x,ship.y) < 50){
  lives-=1;
  invincible = 300;
  }
}
show(){
image(pic, this.x,this.y,pic.width/6,pic.height/6);
}
}






class Laser {
    constructor(initX, initY) {
        this.initX = initX + img.width / 12 - 3;
        this.initY = initY;
        this.ySpeed = -7;
        shot = true;

    }
fired(){

      fill(255, 94, 0);
      for (var i = 1; i <= laserNum; i++) {
          if (Lasers[i].initY > -50) {

              Lasers[i].initY += Lasers[i].ySpeed;
              rect(Lasers[i].initX, Lasers[i].initY, 5, 40)


  }
}
}
checkAsteroid(){
  for(var i=1;i<=numOfAsteroids;i++){
  if(dist(this.initX, this.initY, Asteroids[i].x,Asteroids[i].y) < 50){

    Asteroids[i].cooldown = 1;
Asteroids[i].hit(i);
  }
}
}
}



class Spaceship {
    constructor() {

        this.x = 200;
        this.y = 200
    }
    shoot(initX, initY) {
        laserNum++;
        Lasers[laserNum] = new Laser(initX, initY);


    }

    moveX(xSpeed) {

        this.xSpeed = xSpeed;
        this.x += this.xSpeed;
    }


    moveY(ySpeed) {
        this.ySpeed = ySpeed;
        this.y += this.ySpeed;
    }
    show() {
    var pos = width-40;
    for(var i =0;i<lives;i++){
        image(heart,pos,3,heart.width/16,heart.height/16);
        pos-=40
}
        this.edges();
        image(img, this.x, this.y, img.width / 6, img.height / 6);
        this.initY++;
    }
    edges() {
        if (this.x > width - img.width / 6) {
            this.x = width - img.width / 6;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > height - img.width / 6 + 15) {
            this.y = height - img.width / 6 + 15;
        }
        if (this.y < 0) {
            this.y = 0;
        }
    }


}
