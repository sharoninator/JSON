var ball1;
var left;
var right;
function setup(){
  createCanvas(600,600);
   ball1 = new Ball();
   left = new Paddle();
right = new Paddle();
}

function draw(){
ball1.move();

  ball1.bounce();
left.update(0,mouseY,10,100);
right.update(590, ball1.y-50, 10,100);
 
}

function Ball(){
this.xSpeed = 5;
this.ySpeed = 5;
  this.x = 200;
  this.y = 200;
  this.d = 30;
  this.bounce = function(){ // bounce off paddle
    //x + r > p.x - p.w/2 && y < p.y + p.h/2 && y > p.y - p.h/2
    if(this.x + this.d / 2 >= right.x - right.width / 2 &&
       this.y <right.y + right.height &&
       this.y> right.y - right.height ){
    console.log("beeep");
    this.xSpeed = this.xSpeed * -1;
    }
      else if(this.x - this.d / 2 <= left.x + left.width / 2 &&
         this.y <left.y + left.height &&
         this.y> left.y - left.height /2){
    
    this.xSpeed = this.xSpeed * -1;
    }
console.log(this.y);
  }
this.move = function(){
        if (this.x < 0 || this.x > width) {
this.x = random(0, width);
          this.y = random(0,height);
        
        }
        if (this.y < 0 || this.y > height) {
            this.ySpeed = this.ySpeed * -1;

        }
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        noStroke();
        fill(255);
    background(51);
        ellipse(this.x, this.y, this.d);
}
        
    }
    
    
    function Paddle(){
      
      this.update = function(x,y,width,height){
              this.x = x;

this.width = width;
this.height = height;
this.y = y;// - height/2;
if(this.y > 600 - this.height){
  this.y = 600 - this.height;
  console.log(right.y);
}

        fill(125);
        noStroke();
        rect(this.x, this.y,this.width,this.height);
      
    }
    }
  
