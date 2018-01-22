var ball1;
var left;
var right;
var isRight;
var score1 = 0;
var score2 = 0;
var diff;
var range;
      var newRightLoc = 250;
//float angle;
function setup(){
  createCanvas(600,600);
  ball1 = new Ball();
  left = new Paddle(300);
  right = new Paddle(300);
}

function draw(){
  ball1.move();
  ball1.bounce();
ball1.lose();
  left.update(0,mouseY,false); //user paddle
  right.update(590, newRightLoc,  true); // computer paddle
       right.rightY();

  textSize(25);
   text(score1.toString(),width/4,25 );
    text(score2.toString(),width/2 + width / 4,25 );
}

function Ball(){
  this.xSpeed = 7;
  this.ySpeed = -3;
  this.x = 200;
  this.y = 200;
  this.d = 30;
  this.bounce = function(){ // bounce off paddle
    //x + r > p.x - p.w/2 && y < p.y + p.h/2 && y > p.y - p.h/2
    if(this.x + this.d / 2 >= right.x - right.width / 2 && // collision for right paddle
       this.y <right.y + right.height &&
       this.y> right.y - right.height ){
        
if( right.y - ball1.y >0){
ball1.lose();

} else{

       this.xSpeed = this.xSpeed * -1;
       var hit = this.y - right.y; // hit range between 0 and height of paddle
        range =map(hit, 0, right.height, -7,7);
        this.ySpeed = range;
      }

    }
    else if(this.x - this.d / 2 <= left.x + left.width / 2 &&
         this.y <left.y + left.height &&
         this.y> left.y - left.height /2){
            this.xSpeed = this.xSpeed * -1;
        
            // var a = 1;
            // var b = 5;
            // map(this.y, left.y + left.height/2, left)

            var hit = this.y - left.y; // hit range between 0 and height of paddle
             range =map(hit, 0, left.height, -7,7);
             this.ySpeed = range;

    }

  }
  this.move = function(){

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
      this.lose = function(){
        if (this.x < 0 ) {
          score2++;
             this.ySpeed = 0; 
                    this.x = 300;//random(0, width);
          this.y = 300;
     
          } else if(this.x > width){
            score1++;
               this.ySpeed = 0; 
                    this.x = 300;//random(0, width);
          this.y = 300;
          }
            //random(0,height);

        
      }
}


    function Paddle(y){
      this.yLoc = y;

      this.update = function(x,y, isRight){
              this.x = x;
              this.width = 10;
              this.height = 100;
              this.y = y;// - height/2;


              if(this.y > 600 - this.height){
                this.y = 600 - this.height;
              }
              if(this.y < 0 ){
                this.y =0;
              }
        fill(175);
        noStroke();
        rect(this.x, this.y,this.width,this.height);
    }
    this.rightY = function(){
      rightDist = this.y - ball1.y +50;
      if(rightDist < 0){
         newRightLoc = this.y  + 5;
      } else{
        newRightLoc = this.y  - 5;
      }
    }
  }
