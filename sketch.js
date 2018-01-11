var song;
var button;
var timeSlider;
var lgt;
var volumeSlider;

function preload() {
  song = loadSound('test.mp3');
}

function setup() {

  button = createButton("Play");
  button.mousePressed(toggle);
  lgt = song.duration()
  volumeSlider = createSlider(0, 2.5, 1.25, 0.01);
  timeSlider = createSlider(0, lgt, 1, 0.01);
  timeSlider.changed(jumpTo);
  console.log(song.duration());
}

function toggle() {
  if (song.isPlaying()) {
    song.pause();
    button.html("Play");
  } else {
    song.play();
    button.html("Pause");

  }
}

function jumpTo() {
  song.jump(timeSlider.value());
}

function draw() {

  song.setVolume(volumeSlider.value());
}
