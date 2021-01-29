let minInput, hrInput, alarmMin, alarmHr, alarmDisplay, alarmSound1, ampmButton, alarmAMPM, alarmScene, froggerScene, alarmWin, alarmRun, songButton, currentSong;
let executeAlarmOnce; //-Zach
let initializeOnce;
let isAMPM = "AM";
let frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V, safeY, globalS, globalB, move, car2X, car2Y, car2V, car3X, car3Y, car3V;
//Awesome project idea by the way! looking forward to it - Zach =)


 function preload() {
  console.log("Entering Preload")
  soundFormats('mp3');
  alarmSound1 = loadSound("On_Fire.mp3");
  alarmSound2 = loadSound("Grass_Skirt_Chase");
  alarmSound3 = loadSound("calmAlarm.mp3");
  alarmSound4 = loadSound("alarm_rooster-hug.mp3");
  alarmSound5 = loadSound("Progressive.mp3");
  alarmSound6 = loadSound("still_with_you_by_jk.mp3")
  console.log("Exiting Preload")
}


function setup(){
    createCanvas(600, 400);
    colorMode(HSB, 360, 100, 100);
    backgroundColor = 0;
    textAlign(CENTER);
    //Creates the Hour input button
    hrInput = createInput('');
    hrInput.size(40, 20);
    hrInput.position(210, 380);
    //Creates the Minute input button
    minInput = createInput('');
    minInput.size(40, 20);
    minInput.position(270, 380);
    //Create the button to select AM or PM
    ampmButton = createSelect();
    ampmButton.position(330, 380);
    ampmButton.option("AM");
    ampmButton.option("PM");
    //Create the button to choose song
    songButton = createSelect();
    songButton.position(400, 380);
    songButton.option("Grass Skirt Chase")
    songButton.option("On Fire");
    songButton.option("Calming Guitar");
    songButton.option("Rooster");
    songButton.option("Build Up");
    songButton.option("Still With You");
    
    alarmDisplay = false;
    executeAlarmOnce = false; //-Zach
    initializeOnce = false;
    alarmWin = false;
    alarmRun = false;
    alarmScene = true;
    gameIsOver = false;
    currentSong = ("On Fire");
  // Frogger setup

  globalS = 80;
  globalB = 80;
  frogX = random(width);
  frogY = height + 30;
  score = 0;
  highScore = 0;
  lives = 5;
  gameIsOver = false;
  //Car 1
  car1X = 0;
  car1Y = 100;
  //car1V = 6;
  car1V = 6;
  //Car 2
  car2X = width
  car2Y = 300;
  //   car2V = 4;
  car2V = 4;
  //Car 3
  car3X = 0;
  car3Y = 200;
  //car3V = 6;
  car3V = 6;

  safeY = height;
  move = 20;
}

function draw(){

   if (alarmScene == true){
     background(backgroundColor);
    
     alarm();

     alarmCheck();
   } else if (froggerScene == true){
     background(360);
     // Code for gold goal line
     fill(60, globalS, globalB);
     rect(0, 0, width, 50);
     //Code for frog Safe Zone
     fill(212, globalS, globalB);
     rect(0, safeY, width, height);
     // Code to display Frog
     fill(120, globalS, globalB);
     ellipse(frogX, frogY, 20);
     moveCars();
     drawCars();
     checkCollisions();
     checkBoundaries();
     checkWin();
     displayScores();
   }

}

function keyPressed(){
    if (keyCode == ENTER && alarmScene == true){

        alarmDisplay = true;
        alarmMin = int(minInput.value());
        minInput.value('');
        if ((alarmMin < 10)){
            alarmMin = "0" + alarmMin
        }
        alarmHr = int(hrInput.value());
        hrInput.value('');
        alarmAMPM = ampmButton.value();
        if ((alarmAMPM == "PM") && (alarmHr != 12)){
            alarmHr = alarmHr + 12;
        }
        if ((alarmHr == 12) && (alarmAMPM == "AM")){
            alarmHr = alarmHr - 12;
        }
        console.log('Alarm set to ' + alarmHr + ':' + alarmMin + " " + alarmAMPM);
    }

    if (keyCode === UP_ARROW) {
        frogY -= move;
     }

    if (keyCode === DOWN_ARROW){
       frogY += move;
     }

    if (keyCode === RIGHT_ARROW){
       frogX += move;
     }

    if (keyCode === LEFT_ARROW){
       frogX -= move;
     }
}

function keyTyped(){
    if ((key === ' ') && (gameIsOver == true)){
     froggerScene = false;
     alarmScene = true;
     alarmWin = true;
     gameIsOver = false;
     executeAlarmOnce = false;
     resizeCanvas(600, 400);
     //Creates the Hour input button
     hrInput = createInput('');
     hrInput.size(40, 20);
     hrInput.position(210, 380);
     alarmHr = (" ");
     //Creates the Minute input button
     minInput = createInput('');
     minInput.size(40, 20);
     minInput.position(270, 380);
     alarmMin = (" ");
     //Create the button to select AM or PM
     ampmButton = createSelect();
     ampmButton.position(330, 380);
     ampmButton.option("AM");
     ampmButton.option("PM");
     //Create the button to choose song
     songButton = createSelect();
     songButton.position(400, 380);
     songButton.option("Grass Skirt Chase")
     songButton.option("On Fire");
     songButton.option("Calming Guitar");
     songButton.option("Rooster");
     songButton.option("Build Up");
     songButton.option("Still With You")
     alarmDisplay = false;
     score = 0;
      console.log("Game off");
    }
}

function alarmCheck(){
    if ((minute() == alarmMin) && (hour() == alarmHr) && (alarmAMPM == isAMPM) && (executeAlarmOnce == false)) { //-Zach
       console.log("Alarm") 
       alarmRun = true;
       if (songButton.value() == ("On Fire")){
            currentSong = alarmSound1;
       } else if (songButton.value() == ("Grass Skirt Chase")){
           currentSong = alarmSound2;
       } else if (songButton.value() == ("Calming Guitar")){
           currentSong = alarmSound3;
       } else if (songButton.value() == ("Rooster")){
           currentSong = alarmSound4;
       } else if (songButton.value() == ("Build Up")){
           currentSong = alarmSound5;
       }else if (songButton.value() == ("Still With You")){
            currentSong = alarmSound6;
       }

        currentSong.loop(0, 1, .2);
       executeAlarmOnce = true; //-Zach
       changeScene();
       resizeCanvas(500, 500);
    }
}


function alarm(){
let hr = hour();
    
    if (hr > 11){
        isAMPM = "PM";
    } else {
        isAMPM = "AM"
    }
    
    if (hr > 12){
        hr = hr - 12;
    }

    if (hr < 10 && hr > 0){
        hr = "0"+hr;
    }
    
    if (hr == 0){
        hr = hr + 12
    }

    
  

    let min = minute();
    if (min < 10 && min >= 0){
        min = "0"+min;
    }
    
    let sec = second();
    if (sec < 10 && sec >= 0){
        sec = "0"+sec;
    }

    fill(0, 0, 100);
    textSize(60);
    text(hr + ":" + min + ":" + sec, 260, 200);
    text(isAMPM, 450, 200);
    textSize(17);
    text("Hour", 225, 365);
    text("Min", 285, 365);
    textSize(25);
    text(":", 255, 390);
    textSize(20);
  if ((alarmDisplay == true) && (alarmHr == 0) && (alarmAMPM == "AM")){
        text('Alarm time ' + (alarmHr + 12) + ':' + alarmMin + " " + alarmAMPM, 300, 20);
   } else if (alarmDisplay == true && alarmHr < 12){
        text('Alarm time ' + alarmHr + ':' + alarmMin + " " + alarmAMPM, 300, 20);
   }  else if ((alarmDisplay == true) && (alarmHr > 12) && (alarmAMPM == "PM")) {
       text('Alarm time ' + (alarmHr - 12) + ':' + alarmMin + " " + alarmAMPM, 300, 20);
   } else if ((alarmDisplay == true) && (alarmHr == 12) && (alarmAMPM == "PM")){
       text('Alarm time ' + (alarmHr) + ':' + alarmMin + " " + alarmAMPM, 300, 20);
   }
    else {
       text('Hit enter to confirm your Alarm', 290, 20);
   }


}

function changeScene(){
    alarmScene = false;
    removeElements();
    alarmScene = false;
    froggerScene = true;
    removeElements();
}

function initialize(){
    if ((froggerScene == true) && (initializeOnce == false) && (alarmWin == true)){
    console.log("begin");
    //Creates the Hour input button
    hrInput = createInput('');
    hrInput.size(40, 20);
    hrInput.position(210, 380);
    //Creates the Minute input button
    minInput = createInput('');
    minInput.size(40, 20);
    minInput.position(270, 380);
    //Create the button to select AM or PM
    ampmButton = createSelect();
    ampmButton.position(330, 380);
    ampmButton.option("AM");
    ampmButton.option("PM");
    alarmDisplay = false;
    executeAlarmOnce = false;
    
    }
}

// FROGGER CODE
//////
//////
//////
//////
function moveCars() {
  // Move the car
    car1X += car1V;
    car2X -= car2V;
    car3X += car3V;
  // Reset if it moves off screen
    if (car1X > width){
        car1X = 0;
        car1Y = random(50, 150);
    }

    if (car2X < -60){
        car2X = width;
        car2Y = random(330, 370);
    }

    if (car3X > width){
        car3X = 0;
        car3Y = random(180, 300);
    }
}

function drawCars() {
  // Code for car 1
  fill(0, globalS, globalB);
  rect(car1X, car1Y, 40, 30);
  // Code for car 2
  fill(30, 10, 30);
  rect(car2X, car2Y, 60, 30);
  // Code for car 3
  fill(250, globalS, globalB);
  rect(car3X, car3Y, 30, 30);
  // Code for additional cars
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
    hit = collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20);
    hit2 = collideRectCircle(car2X, car2Y, 60, 30, frogX, frogY, 20);
    hit3 = collideRectCircle(car3X, car3Y, 30, 30, frogX, frogY, 20);

    if (hit == true && !gameIsOver){
        lives -= 1;
        frogY = safeY + 40;
        frogX = random(200, 300);
        console.log("hit!");
    }

    if (hit2 == true && !gameIsOver){
        lives -= 2;
        frogY = safeY + 40;
        frogX = random(200, 300);
        console.log("hit!");
    }

    if (hit3 == true && !gameIsOver){
        lives -= 1;
        frogY = safeY + 40;
        frogX = random(200, 300);
        console.log("hit!");
    }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY < 50){
      frogY = safeY + 20;
      frogX = random(200, 400);
      score += 1;
  }
}


function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  // Display Score
  text(`Score: ${score}`, 30, 30);
  // Display game over message if the game is over
  if (score >= 3){
      currentSong.pause();
      gameIsOver = true;
  }

  if (gameIsOver == true){
      fill (37, 65, 93);
      rect(0, 0, width, height);
      textSize(40);
      fill(255);
      text("Good Morning!", 250, height/2);
      textSize(20);
      text("Press the Space Bar to set a new alarm", 250, 300);
      alarmHr = (" ");
      alarmMin = (" ");
      alarmAMPM = (" ");
  }  
}

//Ensures that the player stays within bounds
function checkBoundaries() {
		if (frogX > width) {
			frogX -= 20;
		}
		if (frogX < 0) {
			frogX += 20;
		}
		if (frogY > height) {
			frogY -= 20;
		}
	}
  