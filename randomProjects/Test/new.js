  "use strict";
var ball = [];
var mag;
var num = parseFloat(prompt("Enter number of balls "));
function setup() {
   mag = createSlider(0,20,2,0.01);
createCanvas(600,600);
 for(var i=1;i<=num;i++){
   ball[i] = new Ball(random(600),random(600));
 }
}

function draw() {
 for(var i=1;i<=num;i++){
ball[i].drawBall(random(-mag.value(),Math.abs(mag.value())),random(-mag.value(),Math.abs(mag.value())));
ball[i].edges();
 }
}



class Ball{
  constructor(x,y){
this.x = x;
this.y = y;
this.d = 30;

this.colors = {
r: random(255),
  g:random(255),
  b: random(255)
};    
  }
  drawBall(xSpeed,ySpeed){
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.x+=xSpeed;
    this.y+=ySpeed;
    fill(this.colors.r,this.colors.g,this.colors.b);
    noStroke();
    ellipse(this.x, this.y,this.d);
    
  }
  edges(){
    if(this.x > width){
      this.x = width - this.d/2;
    } 
    if(this.x < 0){
    this.x = this.d/2;
    } 
    if(this.y > height){
      this.y = height
    }
    if(this.y <0){
      this.y = this.d/2;
    }
  }
  
}
