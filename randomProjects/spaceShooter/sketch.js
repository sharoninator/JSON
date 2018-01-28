"use strict";

var Asteroids = [];
var Aliens = [];
var img;
var ship;
var Lasers = [];
var alienLasers = [];
var alienLaserNum = 0;
var laserNum = 0;
var shot = false;
var alienShot = false;
var pic;
var heart;
var maxAsteroids = 20;
var numOfAsteroids = 1;
var lives = 3;
var invincible = 0;
var laser;
var UFO;
var numOfAliens = 1;
var pos;
var skull;
function preload() {
    // laser =  loadSound("file:///C:/Users/iboss/Desktop/spaceShooter/laser.mp3");
    img = loadImage("ship.png");
    pic = loadImage("asteroid.png");
    heart = loadImage("heart.png");
    UFO = loadImage("UFO.png");
skull = loadImage("skull.png");
}

function setup() {
    createCanvas(600, 600);
    ship = new Spaceship();
    for (var i = 1; i <= maxAsteroids; i++) {
        Asteroids[i] = new Asteroid();
    }
    for (var j = 1; j <= numOfAliens; j++) {
        Aliens[j] = new Alien();
    }

}

function draw() {
    background(51);

    if(alienShot){
      for(var l=1;l<=alienLaserNum;l++){
if(alienLasers[l].active){
        alienLasers[l].show();
                alienLasers[l].update();
                      alienLasers[l].edges();
                    }
      }  
    }
    for (var p = 1; p <= numOfAliens; p++) {
        Aliens[p].show();
        if(alienShot){

            rect(Aliens[p].initX,Aliens[p].initY,10,40)
        }
        if (!Aliens[p].isDown) {
            Aliens[p].down();
        } else {
            Aliens[p].update();
        }
        if(Aliens[p].cooldown === 0){

  Aliens[p].checkLaser();
} else{
  Aliens[p].cooldown--;
    }
}


    for (var j = 1; j <= numOfAsteroids; j++) {
        Asteroids[j].update();
        Asteroids[j].show();
        Asteroids[j].hit();

        if (invincible <= 0) {
            Asteroids[j].hitShip();
        } else {
            invincible--;
        }
    }

    if (shot) {
        Lasers[laserNum].fired();
        for (var k = 1; k <= laserNum; k++) {
            if (Lasers[k].active) {
                Lasers[k].checkAsteroid();
            }
        }
    }
    ship.show();
    ship.lives();
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

class AlienLaser{
  constructor(initX,initY){
    this.initX = initX + UFO.width/24;
    this.initY = initY + UFO.height/24;
        this.laserSpeed = 3;
        this.h =40;
        this.w = 5;
        this.active = true;
  }
  show(){
    fill(43, 0, 255);
    rect(this.initX,this.initY,this.w,this.h);
  }
  update(){
    this.initY +=this.laserSpeed;
  }
  edges(){
    if(this.initY >width + this.h ){
      this.active = false;
    }
  }
}



class Alien {
    constructor() {
        this.ySpeed = random(1.5,3);
        this.xSpeed = random(1,2);
        this.yDown = random(50, 200);
        this.xDown = random(20, 450);
        this.x = this.xDown;
        this.y = -this.yDown;
        this.isDown = false;
        this.cooldown = 0;

        this.shot = false;
    }
    down() {
        this.y += this.ySpeed;
        if (this.y >= this.yDown) {
            this.isDown = true;
        }
    }
    update() {
        if (this.x > ship.x) {
            this.xSpeed = -2;
        } else {
            this.xSpeed = 2;
        }
        this.x += this.xSpeed;


    }
    show() {
        image(UFO, this.x, this.y, UFO.width / 12, UFO.height / 12);
    }
    checkLaser(){
// /ship.x + img.width / 12, ship.y + img.width / 12 - 10
if(Math.max(this.x,ship.x + img.width / 12) - Math.min(this.x,ship.x + img.width / 12)< 400){
  alienLaserNum++;
alienLasers[alienLaserNum] = new AlienLaser(this.x,this.y);

alienShot = true;
    this.cooldown = 60;
}
    }
    fire(initX,initY){
      this.shot = true;
      this.initX = initX;
      this.initY = initY;
console.log(this.initY);
}
}

class Asteroid {
    constructor() {
        this.x = random(20, 550);
        this.y = 0 - random(pic.height / 6, pic.height / 6 + pic.height);
        this.ySpeed = random(3, 4);
        this.xSpeed = 0;
        this.laserHit = false;
    }

    update() {
        this.y += this.ySpeed;
        this.x += this.xSpeed;
    }

    hit() {
        if (this.y > height + random(pic.height / 6, pic.height / 6 + pic.height) || this.laserHit) { // hit by laser or hits bottom of screeen

            this.laserHit = false;
            this.y = 0 - random(pic.height / 6, pic.height / 6 + pic.height);
            this.x = random(20, 550);
            this.ySpeed = random(3, 4.5);
            this.xSpeed = 0;


        }
    }
    hitShip() {

        if (dist(this.x + pic.height / 12 + 5, this.y + pic.height / 12, ship.x + img.width / 12, ship.y + img.width / 12 - 10) < 60) {
            lives -= 1;
            invincible = 300;
        }
    }
    show() {
        image(pic, this.x, this.y, pic.width / 6, pic.height / 6);
    }
}




class Laser {
    constructor(initX, initY) {
        //laser.play();
        this.initX = initX + img.width / 12 - 3;
        this.initY = initY;
        this.ySpeed = -7;
        shot = true;
        this.active = true;

    }
    fired() {
        fill(255, 94, 0);
        for (var i = 1; i <= laserNum; i++) {
            if (Lasers[i].active) {
                if (Lasers[i].initY > -50) { // when the laser gets off screen
                    Lasers[i].initY += Lasers[i].ySpeed;
                    rect(Lasers[i].initX, Lasers[i].initY, 5, 40)
                } else {
                    Lasers[i].active = false;
                }
            }
        }
    }
    checkAsteroid() {
        for (var i = 1; i <= numOfAsteroids; i++) {
            if (dist(this.initX, this.initY, Asteroids[i].x + pic.height / 12 + 5, Asteroids[i].y + pic.height / 6) < 30 && this.active) { // laser hits asteroid
                Asteroids[i].laserHit = true;
                Asteroids[i].hit();
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
         pos = width - 40;
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

    lives(){
      for (var i = 0; i < lives; i++) {
          image(heart, pos, 3, heart.width / 16, heart.height / 16);
          pos -= 40
      }
    }


}
