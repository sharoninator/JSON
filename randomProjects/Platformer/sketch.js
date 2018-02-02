"use strict";
var player;
var Platforms = [];
var platformNum = 3;
function setup() {
createCanvas(1200,600);
  background(255);
player = new Player();
for(var i=0;i<platformNum;i++){

  Platforms[i] = new Platform();
}
}

function draw() {
background(51);
for(var i=0;i<platformNum;i++){
  Platforms[i].show();
}
player.update();
player.edges();
player.show();
if (keyIsDown(32)) {
player.jet();

} else{
  player.jetpack.x = 0;
  player.jetpack.y = 0;
}


}



class Platform{
contructor(){
  this.x = 30;
  this.y = 30;
  console.log(this.x);
}

show(){
  fill(255,0,0);
  rect(this.x,this.y,100,10);


}
}




class Player{
constructor(){

  this.position= createVector(100,100);
  this.velocity = createVector(0,1);
  this.gravity = createVector(0,0.4);
this.jetpack = createVector(0,0);
}
  show(){
    fill(255);
  ellipse(this.position.x,this.position.y,30);
  }

  update(){
    this.velocity.add(this.jetpack);
    this.velocity.add(this.gravity);
      this.position.add(this.velocity);
  }
  jet(){
      this.jetpack = createVector(0,-0.75);
  }
  edges(){

  }
}
