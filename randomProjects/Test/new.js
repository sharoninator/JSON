var bird;
var bg = true;
var num;
var birds = [];
function setup() {
  num =  prompt("Number of balls: ").parseInt();
    createCanvas(600, 600);
    for (var i = 0; i < num; i++) { // from 1 to 10
        birds["bird" + i] = new Bird();
    }
    var button = createButton("Background");
button.mousePressed(toggleBackground);
}
function toggleBackground(){
  if (!bg){
    bg = true;
  } else{
    bg = false;
  }
}
function draw() {
  if(bg == true){
    background(255);
  } 
    for (var j = 0; j < num; j++) { // from 1 to 10
birds["bird" + j].moveBall();
    }
}

//Bird object //
function Bird(x, y, i) {
    this.ySpeed = random(0, 1);
    this.xSpeed = random(0, 1);
    this.x = x;
    this.y = y;
    this.index = i;
    this.d = 25;
    this.color = {
        r: random(255),
        g: random(255),
        b: random(255),
    };
    this.moveBall = function(x, y) {
        if (this.ySpeed > 0.5) {
            this.ySpeed = 5;
        } else {
            this.ySpeed = -5;
        }
        if (this.xSpeed > 0.5) {
            this.xSpeed = 5;
        } else {
            this.xSpeed = -5;
        }

        if (this.x < 0 || this.x > width) {
            this.xSpeed = this.xSpeed * random(-0.5,-5);
            //console.log(this.xSpeed + " " + this.index);            
        }
        if (this.y < 0 || this.y > height) {
            this.ySpeed = this.ySpeed * random(-0.5,-5);
            //console.log(this.ySpeed + " " + this.index);
        }
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        fill(this.color.r, this.color.g, this.color.b);
        noStroke();
        ellipse(this.x, this.y, this.d);
        
    }

}
