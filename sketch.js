
//         // setInterval(function() {
//         //     $.get("http://api.open-notify.org/iss-now.json", function(data) {
//         //         console.log(data.iss_position.latitude);
//         //                         console.log(data.iss_position.longitude);
//         //     });
//         // }, 1000);
// $.get( "http://api.open-notify.org/iss-now.json", function( data ) {
//   console.log(data);
// });
//issX = (width/360) * (180 + long);      
//issY = (height/180) * (90 - lat);
var ISS;
var bg;
function setup() {
    ISS = loadImage("http://freepngimages.com/wp-content/uploads/2015/12/international-space-station-transparent-background.png");
bg = loadImage("https://geology.com/world/world-map.gif");
  createCanvas(1200, 715);
}

function draw() {
  background(bg);
}