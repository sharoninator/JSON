var zoom = 300;
function draw(){
  createCanvas(800,800);
  background(51);
  stroke(255);
noFill();
  drawCircle(300,200,zoom);
  zoom+=200;
  console.log(zoom);
}
function drawCircle(x,y,d){
scale(1.0001001);
ellipse(x,y,d);
if(d>2){

  drawCircle(x-(d*0.5),y,d-(d*0.5));
    drawCircle(x+(d*0.5),y,d-(d*0.5));
        //drawCircle(x,y+(d*0.5),d-(d*0.5));
          //drawCircle(x,y-(d*0.5),d-(d*0.5));
}
}