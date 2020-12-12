var dogUp, dogDown;
var database;
var foodS, foodStock;
var dogUpImg, dogDownImg;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;

function preload(){
  dogUpImg = loadImage("images/dogImg.png");
  dogDownImg = loadImage("images/dogImg1.png");
}

function setup() {
  database= firebase.database();
  createCanvas(1000, 500);
  
  foodObj = new Food();

  dog = createSprite(800, 250, 10, 10);
  dog.addImage(dogUpImg);
  dog.scale= 0.25;

  feed = createButton("Feed the dog");
  feed.position(1100, 450);
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food");
  addFood.position(1200, 450);
  addFood.mousePressed(addFoods);
  

  foodStock= database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  foodObj.display();

  fedTime= database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed= data.val();
  })

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }

  drawSprites();
  //text("Note: Press up arrow key to feed milk", 90, 50);
}

function readStock(data){
  foodS= data.val();
  foodObj.updateFoodStock(foodS);
}

/*function writeStock(x){
  if(x < 0){
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref("/").update({
    Food:x
  })
}*/

function addFoods(){
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog(){
  dog.addImage(dogDownImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

/*var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload(){
sadDog=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}*/