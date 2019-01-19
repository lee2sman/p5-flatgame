//flatgame template by Lee2sman 2018-2019
//leetusman.com
//code=MIT license. artistic work = cc 3.0

let itemText = [
  ["I didn't have an umbrella and no money. When it rained, I ducked under awnings.",0,20],
  ["But I really started to love the rain",20,580],
  ["I took the subway for an hour just to see the beach even if I didn't go in",1000,1300],
  ["I was nervous about all the people. It felt like a constant shoving match.",1050,200],
  ["The city wasn't just big, it was.......another planet.",20,1250],
  ["Sunsets in the city were caramel swirls",2250,350],
  ["My school was a big box. Not the most inviting. But it became something like a home.",1400,620] //no comma after last one!
];


let soundtrack;
var player;
var numOfItems = 4; //set this number to number of items in items folder!
var frame;
var item = [];

function preload(){
    soundtrack = loadSound('assets/soundtrack.mp3');

    item[0] = loadAnimation('assets/waves01.png','assets/waves02.png')
    item[0].location = {'x':1100,'y':900};

    item[1] = loadAnimation('assets/crowd01.png','assets/crowd02.png')
    item[1].location = {'x':1800,'y':300};

    item[2] = loadAnimation('assets/school01.png','assets/school02.png')
    item[2].location = {'x':1750,'y':860};

    item[3] = loadAnimation('assets/rainclouds01.png','assets/rainclouds03.png')
    item[3].location = {'x':300,'y':250};

}

function setup() {
  createCanvas(1366,635); //how big is our world? (in pixels!)

  //font size
  textSize(24);

  //create a sprite and add the 3 animations
  player = createSprite(width, height, 50, 100);

  var myAnimation = player.addAnimation('moving', 'assets/player/player1.png', 'assets/player/player2.png', 'assets/player/player3.png');
  myAnimation.frameDelay = 10; //slow down the animation

  //create some background for visual reference
  frame = loadImage('assets/background.jpg');

}

function draw() {

  background(5, 5, 5); //background color
  image(frame, 0, 0,2*width,2*height);

  for(var i=0; i<numOfItems; i++){
     animation(item[i],item[i].location.x,item[i].location.y);
     item[i].frameDelay = 15;
  }

  movePlayer();

  //set the camera position to the player position
  camera.position.x = player.position.x;
  camera.position.y = player.position.y;

  //limit the player movements
  if(player.position.x < 0)
    player.position.x = 0;
  if(player.position.y < 0)
    player.position.y = 0;
  if(player.position.x > 2*width)
    player.position.x = 2*width;
  if(player.position.y > 2*height)
    player.position.y = 2*height;

  //text for items
  for (var i = 0; i < itemText.length; i++){
    strokeWeight(2);
    stroke(0);
    fill(30,60,200); //color of text
    //show all of the text
    text(itemText[i][0],itemText[i][1],itemText[i][2]);
    fill(0);
  }

  //character on the top
  drawSprite(player);
}

function movePlayer(){
  if (keyIsPressed){
    if (!soundtrack.isPlaying()){
      soundtrack.loop();
    }
  }
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
