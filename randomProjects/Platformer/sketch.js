"use strict";

var player;
var Platforms = [];
var platformNum = 7;
var loaded = 0;
var fuel = 300;
var img;
var pressed = false;
var flame;



function preload(){
img = loadImage("jetpack.png");
flame = loadImage("flame.png");
}

function setup() {
    createCanvas(1200, 600);
    player = new Player();
    for(var i=0;i<platformNum;i++){
      Platforms[i] = new Platform();
    }
}

function draw() {
    background(51);
    fuel+=0.2;
    for(var i=0;i<platformNum;i++){
      Platforms[i].show();
            Platforms[i].update();
                      Platforms[i].offScreen();
                                 Platforms[i].ballPos();
    }

    player.update();
    player.edges();
    player.show();
    if (keyIsDown(32)) {
      if(fuel > 0){
        player.jet();
        pressed = true;
        fuel--;
      }else{
        pressed = false;
      }


    } else {
        player.jetpack.x = 0;
        player.jetpack.y = 0;
        pressed = false;
    }

}

function fuelBar(){
rect(width/2 - 40, 40,300,10)
fill(0,255,0);
rect(width/2-40,40,fuel,10);

}



class Platform {
    constructor() {
        this.x = random(0,width);
        this.y = random(height/4,height);
        this.xSpeed = -8;
        this.h = 10;
        this.w = random(150,600);
        loaded++;
    }

    show() {
        fill(255, 0, 0);
        rect(this.x, this.y, this.w , this.h );


    }

    update(){
      this.x += this.xSpeed;

    }

 offScreen(){
   if(this.x<-this.w){
     this.x = random(width,width*4);
     this.y = random(height/4,height);
   }
 }

 ballPos(){
 if(player.position.x > this.x && player.position.x < this.x + this.w && this.y < player.position.y && (player.position.y-this.y) < 15 ){
console.log(player.position.y-this.y);

    player.position.y = this.y - 1;
    player.gravity.y = 0;
    player.jetpack.y = 0;
       player.velocity.y = 0;
} else{
    player.gravity.y = 0.4;
}


 }


}

class Player {
    constructor() {

        this.position = createVector(100, 100);
        this.velocity = createVector(0, 1);
        this.gravity = createVector(0, 0.4);
        this.jetpack = createVector(0, 0);
    }
    show() {
        fill(255);
        ellipse(this.position.x, this.position.y -14, 30);
        if(pressed){
      image(flame,this.position.x - 34,this.position.y -4,flame.width/16,flame.height/16);
        }
    image(img,this.position.x-30,this.position.y - 34,img.width/12,img.height/12);
fuelBar();
    }

    update() {
        this.velocity.add(this.jetpack);
        this.velocity.add(this.gravity);
        this.position.add(this.velocity);
    }
    jet() {
        this.jetpack = createVector(0, -0.75);

    }
    edges() {
if(this.position.y > height -15){
  this.position.y = height - 15;
  this.velocity.y = 0;
} else if(this.position.y < 15){
  this.position.y = 15;
  this.jetpack.y = 1;
  this.velocity.y = 1;
}
    }
}
