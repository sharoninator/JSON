var bird;
function setup(){
  createCanvas(600,600);
bird = new Bird();

}
function draw(){
  background(51);

bird.moveBall();
  }


//Bird object //
function Bird(){
  this.y = 403;
  this.x = 43;
  this.d=30
 this.moveBall = function(){
    this.x+=10;
  
    ellipse(this.x,this.y,this.d);
    if(this.x < 0   || this.x > width){
      this.x = this.x - 30
      this.x = this.x  *-1;
    }
        if(this.y <  0|| this.y > height){
      this.y = this.y* -1;
    } 
}

}

