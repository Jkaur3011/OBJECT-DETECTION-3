status = ""; //empty var for value of status
objects = [];

function preload() {
    img = loadImage("balcony.jpg"); //image loaded
}

function setup() {
    canvas = createCanvas(750, 500); //canvas created
    canvas.position(380, 150); //canvas position 
    obj_detector = ml5.objectDetector("cocossd", modelloaded); //cocossd model initialized
    document.getElementById("status").innerHTML = "Status: Detecting Objects"; //html status changed
}

function modelloaded() {
    console.log("Model is loaded!"); //check for initialisation of model
    status = true; //status updated to model working(true)
    obj_detector.detect(img, gotResults); //image set to detection
}

function gotResults(error, results) {
    if (error) {
        console.log(error); //errors to be written on console
    } else {
        console.log(results);
        objects = results; //results put in array objects
    }
}

function draw() {
    image(img, 0, 0, 750, 500); //image loaded
    if (status != "") { //if the status is true
        for (i = 0; i < objects.length; i++) { //loop
            confidence = objects[i].confidence; //fetched confidence
            percent = floor(confidence * 100); //converted to percent
            name = objects[i].label; //fetched name
            x = objects[i].x; //fetched x position
            y = objects[i].y; //fetched y position
            width = objects[i].width; //fetched width
            height = objects[i].height; //fetched height

            fill("white"); //text fill colour
            textSize(20); //text size
            noStroke();
            text(name + " " + percent + "%", x, y + 2); //text label shown

            noFill();

            strokeWeight(2); //line width
            stroke("white"); //line colours
            rect(x, y + 5, width, height); //rectangle drawn

            document.getElementById("status").innerHTML = "There are 2 big objects in the image out of which CocoSsd Model has detected 1."; //html status changed
        }
    }
}