"use strict";
var machine;
var prizeImages = [];
var clawMachine;
var prizes = [];
var prizeNum = 6;
var openClaw;
var closedClaw;
function preload(){
  prizeImages[0] = loadImage("prize1.png");


    prizeImages[1] = loadImage("prize2.png");

  openClaw = loadImage("openClaw.png");
  closedClaw = loadImage("closedClaw.png");
  clawMachine = loadImage("clawMachine.jpg");
}
function setup(){
  machine = new Machine();
for(var i=0;i<prizeNum;i++){
  prizes[i] = new Prize(i);

}

for(var k=0;k<prizeNum;k++){
for(var j=0;j<prizeNum;j++){


var temp = Math.max(prizes[k].position.x,prizes[j].position.x) - Math.min(prizes[k].position.x,prizes[j].position.x);
  if( j !== k && temp < 30 && temp!=0){
    // console.log(temp)
  prizes[k].position.x = random(machine.edges.topLeft.x,machine.edges.bottomRight.x-30)
  console.log(prizes[k].position.x + " " + temp)
 k  =0;
j=0;
  }
}
}
  createCanvas(600,575);
}

function draw(){
  machine.show();
for(var i=0;i<prizeNum;i++){
  prizes[i].update();
  prizes[i].show();
  prizes[i].edges();
}


machine.claw();
if(machine.getting){
  machine.down();
}else{
machine.move();

machine.border();
}


}


function keyPressed() {
  if (keyCode === 32 && !machine.getting) {
machine.xSpeed = 3;
      machine.ySpeed = 3;
    machine.getting = true;
  }
}





class Prize{
constructor(i){
  this.i = i;
  this.imgTemp = parseInt(random(0,prizeImages.length));
  this.img= prizeImages[this.imgTemp],
  this.velocity = createVector(0, 1);
  this.gravity = createVector(0, 0.4);
  this.push = createVector(0,0);
  this.position = createVector(random(machine.edges.topLeft.x + 30,machine.edges.bottomRight.x - 30),random(machine.edges.topLeft.y,machine.edges.bottomRight.y - 30));
  }
  show(){
image(this.img,this.position.x,this.position.y, 30,30)
  }
  update(){
      this.velocity.add(this.push);
    this.velocity.add(this.gravity);
    this.position.add(this.velocity);
  }

  edges(){
if(this.position.y > machine.edges.bottomRight.y - 30){
  this.velocity.y = 0;
  this.gravity.y = 0;
}

// for(var i=0;i<prizes.length;i++){
// if(i !=this.i&& (dist(this.position.x,this.position.y,prizes[i].position.x,prizes[i].position.y)  < 20  )){
//
//    this.position.y = random(machine.edges.topLeft.y,machine.edges.bottomRight.y);
//    i=0;
//
// }
// }




  }
}




class Machine{
constructor(){
  this.ySpeed = 3;
  this.xSpeed = 3;
  this.getting = false;
this.open = true;
   this.edges = {
 topLeft: createVector(182,56),
 bottomRight: createVector(536,318)

  }
  this.x = this.edges.topLeft.x;
  this.y = this.edges.topLeft.y;
}
down(){

this.y+=this.ySpeed;
if(this.y > this.edges.bottomRight.y - closedClaw.height/12){
  this.open = false;
  this.ySpeed*=-1;
}
if(this.y === this.edges.topLeft.y){
  this.ySpeed = 0;
  this.x+=this.xSpeed;
}
if(this.x >= this.edges.bottomRight.x - openClaw.width/12){
  this.xSpeed = 0;
  this.open = true;
  this.getting = false;
}
}


show(){
  image(clawMachine,0,0,clawMachine.width *  1.5,clawMachine.height * 1.5);
    rect(this.edges.topLeft.x,this.edges.topLeft.y,this.edges.bottomRight.x - this.edges.topLeft.x, this.edges.bottomRight.y - this.edges.topLeft.y);

}
claw(){
  if(!machine.open){
       image(closedClaw,this.x,this.y,openClaw.width/12,openClaw.height/12);
  } else{
  image(openClaw,this.x,this.y,openClaw.width/12,openClaw.height/12);
}
strokeWeight(4);
line(this.x + openClaw.width/24,this.edges.topLeft.y + 3, this.x + openClaw.width/24,this.y  + 2);

}
move(){
      if (keyIsDown(LEFT_ARROW)) {
              machine.x-=3;
          }

          if (keyIsDown(UP_ARROW)) {
                  machine.y-=3;
              }
              if (keyIsDown(DOWN_ARROW)) {
                      machine.y+=3;
                  }
                          if (keyIsDown(RIGHT_ARROW)) {
                                  machine.x+=3;
                              }

                            }






border(){
if(this.x > this.edges.bottomRight.x - openClaw.width/12){
  this.x = this.edges.bottomRight.x - openClaw.width/12;
}
if(this.x < this.edges.topLeft.x ){
  this.x = this.edges.topLeft.x;
}
if(this.y < this.edges.topLeft.y + 3 ){
  this.y = this.edges.topLeft.y + 3;
}

if(this.y > this.edges.topLeft.y + 90){
  this.y = this.edges.topLeft.y + 90;
}



}


}
