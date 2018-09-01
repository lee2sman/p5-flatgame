//flatgame template by github/Lee2sman 2018
//MIT License
//
//IMPORTANT: number items in assets/items folder starting from 0

//requires p5play

//FILL THIS OUT WITH TEXT ON EACH ITEM IN FOLDER
//SHOULD be same amount of phrases as items in items folder and numOfItems
var itemText = [
  "I took the subway for an hour just to see the beach even if I didn't go in",
  "I was nervous about all the people. It felt like a constant shoving match.",
  "My school was a big box. Not the most inviting. But it became something like a home.",
  "I didn't have an umbrella and no money. When it rained, I ducked under awnings.",
];

var player;
var numOfItems = 4; //set this number to number of items in items folder!
var bg;
var frame;
var item = [];
var itemIMG = [];
//the scene is twice the size of the canvas

//default
var SCENE_W = 1600;
var SCENE_H = 800;

function preload(){
  for (var i = 1; i <= numOfItems; i++)  {   //we use <= so we can number from 1
    itemIMG[i] = loadImage('assets/items/' + i +'.jpg');
  }
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  SCENE_W = 2*windowWidth;
  SCENE_H = 2*windowHeight;

  //load soundtrack, with callback
  soundtrack = loadSound('assets/soundtrack.mp3', playSoundtrack);

  //font size
  textSize(24);

  //create a sprite and add the 3 animations
  player = createSprite(width, height, 50, 100);

  var myAnimation = player.addAnimation('moving', 'assets/player/player1.jpg', 'assets/player/player2.jpg', 'assets/player/player3.jpg');
  myAnimation.frameDelay = 10; //slow down the animation

  bg = new Group();

  //create some background for visual reference
  for(var i=1; i<=numOfItems; i++)
  {
    //create a sprite and add its image
    item[i] = createSprite(random(0,2*width), random(0,2*height));
    //TODO: ADD ARRAY TO SAVE ITEM X, Y LOCATIONS AND SPACE OUT BETTER!

    item[i].addImage(itemIMG[i]);
    //cycles through items 0 1 2
  //  item.addAnimation('normal', 'assets/items'+i%3+'.png'); //can always implement animation later
    bg.add(item[i]);
  }

  frame = loadImage('assets/background.jpg');
}

function draw() {
  background(5, 5, 5);
  image(frame, 0, 0,2*width,2*height);

  //mouse trailer, the speed is inversely proportional to the mouse distance
  //player.velocity.x = (camera.mouseX-player.position.x)/20;
  //player.velocity.y = (camera.mouseY-player.position.y)/20;
movePlayer();

  //a camera is created automatically at the beginning

  //.5 zoom is zooming out (50% of the normal size)
  if(mouseIsPressed)
    camera.zoom = 0.5;
  else
    camera.zoom = 1;

  //set the camera position to the player position
  camera.position.x = player.position.x;
  camera.position.y = player.position.y;

  //limit the player movements
  if(player.position.x < 0)
    player.position.x = 0;
  if(player.position.y < 0)
    player.position.y = 0;
  if(player.position.x > SCENE_W)
    player.position.x = SCENE_W;
  if(player.position.y > SCENE_H)
    player.position.y = SCENE_H;

  //draw the scene
  //items first
  drawSprites(bg);

  //text for items
  for (var i = 0; i < numOfItems; i++){
    stroke(255);
    fill(255);
    strokeWeight(1);
    text(itemText[i],item[i+1].position.x + item[i+1].width + 50, item[i+1].position.y, 300, 300)
    fill(0);
  }


  //character on the top
  drawSprite(player);
}

function playSoundtrack(){
  soundtrack.play();
}

function movePlayer(){
 if (keyIsDown(LEFT_ARROW)) {
    player.position.x -= 25;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.position.x += 25;
  }

  if (keyIsDown(UP_ARROW)) {
    player.position.y -= 25;
  }

  if (keyIsDown(DOWN_ARROW)) {
    player.position.y += 25;
  }

}
