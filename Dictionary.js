var mic
var bg;
var slider;
function setup(){
     bg = loadImage("faceBank.jpg");
  createCanvas(700,700);
  mic = new p5.AudioIn();
  mic.start();
  createP("Microphone sensitivity");
  slider = createSlider(0,10000,2000,1);
} function draw(){
   background(bg);
     fill(40,40,40);
     noStroke();
  var vol = map(mic.getLevel(),0,1,1,slider.value());
  if(vol > 90){
    vol = 90;
      ellipse(350,385,201.25,90);
  } else{
      ellipse(350,385,201.25,vol);
  }


}
