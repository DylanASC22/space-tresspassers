let myXPos = 250;
let myYPos = 700;
let bulletX = 250;
let bulletY = 700;
let enemyXPos = 250;
let enemyYPos = 40;
let direction = 1;
let speed = 7;
let bulletDirection = 1;
let enemyYBullet = 40;
let enemyXBullet = 250;
let gameOver = false;
let userImage;
let enemyImage;
let happyEarth;
let sadEarth;
let userSound;
let enemySound;
let music;
let badEnding;
let goodEnding;
let space;
var mode;
function preload() {
userImage = loadImage("Images/Ship 2.png");
enemyImage = loadImage("Images/enemy2.png");
happyEarth = loadImage("Images/happyEarth.jpg");
sadEarth = loadImage("Images/sadEarth.jpg");
space = loadImage("Images/spaceInvadersBackground.jpg");

music = loadSound("sounds/music.mp3");
enemySound = loadSound("sounds/enemyBlast.mp3");
userSound = loadSound("sounds/userBlast.mp3");
badEnding = loadSound("sounds/badEnding.mp3");
goodEnding = loadSound("sounds/goodEnding.mp3");
}
function setup() {
    var canvas = createCanvas(500, 750);
    canvas.parent("game_holder")
    noStroke();
    rectMode(CENTER);
    backgroundMusic();
    mode = 0;
 }
 function draw() {
   if (mode == 0) {
      background(0);
      fill (255, 215, 0);
      textSize (30);
      text("Press ENTER to start.", 100, 375);
      menu();
   }
   if (mode == 1) {
   game();
   enemy();
   keyPressed();
   flying();
   myHitBox();
   enemyHitBox();
   theEnd();
   }
}
function game(){
background(space, 250, 375, 500, 750);
let shipXPos = myXPos - 35;
let shipYPos = myYPos - 40;
let ufoXPos = enemyXPos - 27;
let ufoYPos = enemyYPos - 30;
    fill(255, 69, 0);
    rect(bulletX, bulletY, 6, 14);
   
    noFill();
    rect(myXPos, myYPos, 40, 40);
   image(userImage, shipXPos, shipYPos, 60, 68);
    if (keyIsDown(LEFT_ARROW)) {
        myXPos -=3;
        if (bulletY == 700) {
         bulletX -=3;
       }
 }
 if (keyIsDown(RIGHT_ARROW)) {
    myXPos +=3;
    if (bulletY == 700) {
      bulletX +=3;
    }
    }
if (myXPos < 20) {
   myXPos = 21;
   bulletX = 21;
 }
 if (myXPos > 480) {
    myXPos = 479;
    bulletX = 479;
 }
 fill(124, 252, 0);
 rect(enemyXBullet, enemyYBullet, 10, 22);
 noFill();
 rect(enemyXPos, enemyYPos, 34, 34);
 image(enemyImage, ufoXPos, ufoYPos, 65, 50);
 if (enemyYBullet < 56) {
   enemySound.play();
}
 if (enemyXPos > 476) {
   enemyXPos = 475;
 }
 if (enemyXPos < 24){
   enemyXPos = 25;
 }
 enemyXPos += speed * direction;
 if (enemyXPos > 476 || enemyXPos < 24 ){
   direction *= -1;
   bulletDirection *= -1;
   speed = random(4, 10);
}
if (bulletY < -8) {
   bulletY = myYPos;
   bulletX = myXPos;
}
}
function flying() {
   if (bulletY < 700) {
      bulletY -=8;
      if (bulletY > 688) {
         userSound.play();
      }
   }
}
function keyPressed() {
   if (keyCode === UP_ARROW) {
      bulletY -= 1;
}
}
function enemy(){
   if (enemyYBullet > 40) {
      bulletDirection *= 0;
   }
   if (enemyYBullet > 800) {
      enemyYBullet = 40;
      enemyXBullet = enemyXPos;
   }
   enemyYBullet += 1;
   if (enemyYBullet > 40) {
      enemyYBullet +=9;
   }
}
function myHitBox() {
myLeft = myXPos - 20;
myRight = myXPos + 20;
myTop = myYPos - 20;
myBottom = myYPos + 20;
bulletLeft = enemyXBullet - 5;
bulletRight = enemyXBullet + 5;
bulletTop = enemyYBullet - 11;
bulletBottom = enemyYBullet + 11;
if (myLeft > bulletRight || myRight < bulletLeft || myTop > bulletBottom || myBottom < bulletTop) {
}
else {
   background(0);
    fill(255, 255, 255);
    textSize(80);
    text("You lost :(", 100, 200);
    image(sadEarth, 100, 300, 400, 300);
    gameOver = true;
    badEnding.play();
   textSize(25);
   text("Refresh the page to restart.", 100, 300);
}
}
function enemyHitBox() {
   myBulletLeft = bulletX - 3;
   myBulletRight = bulletX + 3;
   myBulletTop = bulletY - 7;
   myBulletBottom = bulletY + 7;
   
   enemyLeft = enemyXPos - 17;
   enemyRight = enemyXPos + 17;
   enemyTop = enemyYPos - 17;
   enemyBottom = enemyYPos + 17;
   
   if (myBulletLeft > enemyRight || myBulletRight < enemyLeft || myBulletTop > enemyBottom || myBulletBottom < enemyTop) {
   
   }
   
   else {
      background(0);
   
       fill(255, 255, 255);
       textSize(80);
       text("You won!", 100, 200);
       image(happyEarth, 100, 300, 300, 300);
       gameOver = true;
       goodEnding.play();
      }
 }
function theEnd() {
   if (gameOver == true) {
   noLoop();
   music.stop();
   }
}
function backgroundMusic() {
   music.play();
   music.loop();
   userStartAudio();
}
function menu() {
   if (keyCode===ENTER) {
      mode=1;
   }
}