"use strict";
var Targets = [];
var num = 2 ;
var hammer;
var mole;
var bg;
var xPos = [130, 310,490];
var yPos = [300,400,510];
var bash;
var cliecked = 0;
var down = false;
var wait = 0;
function preload(){
  bg = loadImage("background.png");
  hammer = loadImage("hammer.png");
  mole = loadImage("mole.png");
}
function setup() {
  createCanvas(600,600);
  for(var i=0;i<num;i++){
    Targets[i] = new Target();
    bash = new Hammer();
  }
}


function draw() {
    background(bg);
    down = false;
    if (mouseIsPressed) {
    down = true;

 }
  for(var i=0;i<Targets.length;i++){


    if(Targets[i].new){
    Targets[i].show();
  }
  }
if(wait >0){
  wait--;
}  if(wait === 1){
console.log(wait);
  Targets[0].newTarget();
}


  bash.show();

}
function mouseClicked() {
for(var i=0;i<Targets.length;i++){
  if(dist(Targets[i].x,Targets[i].y,mouseX,mouseY) <= 40){
    Targets[i].redefine();
  }
}
}

class Hammer{
  constructor(){

  }
  show(){
angleMode(DEGREES);
translate(mouseX-hammer.width/2,mouseY);
if(down){
  rotate(20);
}
    // image(hammer,mouseX - hammer.width/2,mouseY - 100,hammer.width/2,hammer.height/2);
    image(hammer,0,-100,hammer.width/2,hammer.height/2);
// translate(200,200);
  }

}


class Target{
  constructor(){
    this.d = 30;
    this.x = xPos[parseInt(random(0,3))];
    this.y = yPos[parseInt(random(0,3))];
    this.new = true;
  }
  show(){
    fill(255,0,0);

    image(mole,this.x - mole.width/8,this.y - mole.height/8,mole.width/4,mole.height/4);

  }
  redefine(){
    for(var j=0;j<Targets.length;j++){
    Targets[j].new = false;


    }
 wait = parseInt(random(10,100));
  }
  newTarget(){
    console.log("new");
    num = random(0,3);
      for(var i=0;i<num;i++){
        Targets[i] = new Target();
      }
  }
}
