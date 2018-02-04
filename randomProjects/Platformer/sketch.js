"use strict";

var player;
var Platforms = [];
var platformNum = 6;
var loaded = 0;
var fuel;
var img;
var pressed = false;
var flame;
var spikes;
var gas;
function preload(){
  gas = loadImage("fuel.png");
img = loadImage("jetpack.png");
flame = loadImage("flame.png");
spikes = loadImage("spikes.png");
}

function setup() {
    createCanvas(1200, 600);
    fuel = new Fuel();
    player = new Player();
    for(var i=0;i<platformNum;i++){
      Platforms[i] = new Platform();
    }
}

function draw() {
    background(51);
fuel.fuelBar();
  fuel.update();

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
      if(fuel.amt > 0){
        player.jet();
        pressed = true;
        fuel.amt--;
      }else{
        fuel.amt--;
        pressed = false;
        if(fuel.amt < -10){
          fuel.amt = -10;

        }
      }


    } else {
        player.jetpack.x = 0;
        player.jetpack.y = 0;
        pressed = false;
    }

}




function mousePressed(){
if(player.position.y > height -15){
  location.reload();
}

}





class Fuel{
  constructor(){
this.amt = 300;
this.bar = false;
  }
  fuelBar(){
  rect(width/2 - 140, 40,300,10)
  fill(0,255,0);
  if(!this.bar){
  rect(width/2-140,40,this.amt,10);
}

}
update(){
  fuel.amt+=0.25;
  if(fuel.amt < 0 ){
    this.bar = true;

  } else{
    this.bar = false;
  }
}
}



class Platform {
    constructor() {
      this.chance = parseInt(random(0,15));
      if(this.chance === 5){
        this.fuelIcon = true;
      }else{
        this.fuelIcon = false;
      }
      this.beginning  = -4;
      this.end = -7;
        this.x = random(0,width * 3);
        this.y = random(height/4,height - 50);
        this.xSpeed = random(this.beginning,this.end);
        this.h = 10;
        this.w = random(150,600);
        this.getGas = 0;
        loaded++;
    }

    show() {
        fill(255, 0, 0);
        rect(this.x, this.y, this.w , this.h );

        for(var i=0;i<width;i+=spikes.width/12){
          image(spikes,i,height-spikes.height/12,spikes.width/12,spikes.height/12);
        }

        if(this.fuelIcon){
          image(gas, this.x + this.w/2 - 50,this.y-50 ,gas.width/48,gas.height/48)
        }

    }

    update(){
      this.x += this.xSpeed;
      if(this.fuelIcon){
      if(dist(this.x + this.w/2 - 50,this.y-50 ,player.position.x,player.position.y) < 60){
this.getGas++;
      }
      if(this.getGas > 1){

        fuel.amt +=100;
        this.getGas = 0;
        this.fuelIcon = false;
          console.log(fuel.amt);
      }

    }
    if(fuel.amt > 300){
      fuel.amt = 300;
    }
  }

 offScreen(){

   if(this.x<-this.w){

     this.x = random(width,width*3);
     this.y = random(height/4,height - 50);
       this.xSpeed = random(this.beginning,this.end);
       this.chance = parseInt(random(0,15));
       if(this.chance  === 5){
         this.fuelIcon = true;
       }else{
         this.fuelIcon = false;
       }
       this.beginning-=0.15;
       this.end-=0.15
   }
 }

 ballPos(){
 if(player.position.x > this.x && player.position.x < this.x + this.w && this.y < player.position.y && (player.position.y-this.y) < 15 ){


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
  fill(255);
textSize(300);
text("Dead!",30,300);
textSize(50);
text("Click anywhere to play again",40,400);
noLoop();
} else if(this.position.y < 15){
  this.position.y = 15;
  this.jetpack.y = 1;
  this.velocity.y = 1;
}
    }



}
