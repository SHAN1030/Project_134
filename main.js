var img = "";
var status_1 = "";
objects = [];
let sound;


function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function preload(){
    sound = loadSound("emergency_alert.mp3");
}

function draw(){
    image(video,0,0,380,380);
    if(status_1 != "" ){
        r = 0;
        g = random(255);
        b = 0;
        objectDetector.detect(video,gotResults);
        for(i=0; i<objects.length; i++){
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+ percent +"%", objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y,objects[i].width,objects[i].height);
            
            if (objects [0].label == 'person'){
                console.log("Baby Detected");
                document.getElementById("status").innerHTML = "Status: BABY DETECTED";
                sound.stop();              
            }
            else
            {
               console.log("No Baby Detected");
               document.getElementById("status").innerHTML = "Status: NO BABY DETECTED!";
               sound.play();
               sound.setVolume(.5);
            }
        }
    }
}

function modelloaded(){
    console.log("MODEL IS LOADED");
    status_1 = true;
}

function gotResults(error,results){
     if(error){
        console.log(error);
    }
    objects = results;
    console.log(results);
}

