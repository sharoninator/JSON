for(var i =0;i<2000;i++){
$.get( "https://qrng.anu.edu.au/API/jsonI.php?length= + i + "&type=uint8&#8217", function( data ) {
           var num = data[0];                 
});
  createP(data.success);
}
