 var bg;
  var x;
var y;
    function setup() {

    bg = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/World_map_green.png/1200px-World_map_green.png");
   bg.resize(1520, 817);
    createCanvas(1520, 817);
   
  }
  function draw() {
   
  $.get( "http://api.open-notify.org/iss-now.json", function( data ) {
 var y = (817/180)*(90-(parseFloat(data.iss_position.latitude))) ;
                              var x = (1520 / 360) * (180+(parseFloat(data.iss_position.longitude)) - 15);
                              fill(255,78,0);
   coords.innerHTML = "Latitude: " + data.iss_position.latitude + " Longitude: "  + data.iss_position.longitude;
      background(bg); 
    ellipse(x,y,30,30);
  
                              
});
  } 
