var sel;
function setup(){
sel = createSelect();
  sel.position(10, 10);
  sel.option('Audio Project', "Dictionary.js");
  sel.option('ISS Position', "new.js");
  sel.changed(choosePage);
}
function choosePage(){
document.getElementById("choose").src = sel.option.value();
}
