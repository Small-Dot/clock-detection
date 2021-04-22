clockimg = "";
clockstatus = ""; 
clockobjects = [];

function preload(){
clockimg = loadImage("clock.jpg");
}

function setup(){
    canvas = createCanvas(320, 400);
    canvas.center();
    objectDetector = ml5.objectDetector('coco SSD', modelLoaded);
    document.getElementById("clockstatus").innerHTML ="Status : Detecting objects "
}

function modelLoaded(){
   console.log("model loaded.");
   clockstatus = true;
   objectDetector.detect(clockimg, gotResults);
}

function gotResults(error, results){
   if (error){
       console.error(error);
   }
   else{
       console.log(results);
       clockobjects = results;
   }
}
function draw(){
    image(clockimg, 0, 0, 320, 400);
    
  if(clockstatus != ""){
   for (i = 0; i < clockobjects.length; i++){
       document.getElementById("clockstatus").innerHTML = "Objects Detected";
       percentageindecimals = clockobjects[0].confidence;
       percentage = floor(percentageindecimals*100) + " %";
       text(clockobjects[i].label + "  " + percentage, clockobjects[i].x, clockobjects[i].y);
       stroke("#0E0E52")
       noFill();
       rect(clockobjects[i].x, clockobjects[i].y, clockobjects[i].width, clockobjects[i].height);
   }
  }
}
