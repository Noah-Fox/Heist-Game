//Finished version. Completely debugged

function setup() {
  createCanvas(480, 480);
  angleMode(DEGREES);
  textAlign(CENTER,CENTER);
  rectMode(CENTER);
  textSize(25);
}

//variables ************************************

//player
var playerX = 240;
var playerY = 470;
var speed = 2;
var diameter = 10;
var realSize = 10;
var leftExit = false;
var money = 0;

//making lines
var lineSize = 130;//length of lines
var lineAmount = 25;//number of lines
var extra = 15;//min opening in a loop
var looped = [];
var newX;
var newY;
var newX1;
var newX2;
var newY1;
var newY2;
var newAngle;
var linesEachTouching = [[1,3],[0,2],[1,3],[0,2]];
var lines = [[-5,0,485,0],[480,-5,480,485],[485,480,-5,480],[0,485,0,-5]];
var testingLines = [[-5,0,485,0],[480,-5,480,485],[485,480,-5,480],[0,485,0,-5]];


//making enemy's path
var minPathDistance = 2000;//min distance the path has to be
var minPathPoints = 7;//min number of points in the path
var spreadDistance = 400;//min height and width of the total path
var pathPoints = [[240.5,10]];
var testing = true;
var bigTesting = true;
var testX;
var testY;
var pathDistance = 0;
var minXPoint = 255;
var maxXPoint = 0;
var minYPoint = 255;
var maxYPoint = 0;

//building lines/path/coins
var retryBuild = false;
var building = true;

//basic enemy
var enemyChaseSpeed = 3;//enemy speed when chasing the player
var enemyReturnSpeed = 2;//enemy speed when returning from chase
var enemyRoamSpeed = 1;//enemy speed when following the path
var dotX = 240.5;
var dotY = 10;
var canSee = false;
var turning = true;
var direction;
var toPoint = 0;
var goingToPoint = [];
var goingFromPoint = [];
var enemyXSpeed;
var enemyYSpeed;
var enemySpeed = 1;


//enemy chasing
var startChasing = false;
var chasing = false;
var chasingPath = [];
var toChasingPoint = 0;
var chasingDirection = 1;
var finishedChasing = false;
var lastSeen = [-1,-1];

//making coins
var coinAmount = 20;//number of coins
var coinDiameter = 10;//size of coins
var coinX;
var coinY;
var gotCoin = true;
var coins = [];
var pointsGot = 0;


var nowLooped = [];

var roomNum = 1;
var clicking = false;
var pressing = false;

//friends
//each array contains [name[0],color[1],power color[2],power being used boolean[3],time to be counted down[4], max time[5],extra value[6],max time[7],max extra[8],time add by[9], extra add by[10]]
//0 255 255
var friends = [["normal",[255,255,255],[255,255,255],false,0,0,0,0,0,0,0],
              ["Runner",[255,0,0],[255,100,0],false,300,300,3,1000,4,100,0.25],
              ["Mapper",[0,200,255],[0,250,255],false,300,300,5,2000,10,100,1],
              ["Invisible",[0,0,255],[185,185,185],false,300,300,0,1000,0,100,0],
              ["Shrinker",[100,100,100],[70,70,70],false,500,500,1,1000,5,1000,0.25],
              ["Ghost",[255,255,0],[220,220,0],false,100,100,0,1000,0,100,0]];
var friendOn = 0;
var friendClicked = [-1,-1];
var friendBuys = [["Nothing"],
                 ["Runner","Longer","Faster"],
                 ["Mapper","Longer","More"],
                 ["Invisible","Longer"],
                 ["Shrinker","Longer","Smaller"],
                 ["Ghost","Longer"]];
var friendDesc = [["Nothing"],
                 ["Run fast","Run for longer","Run faster"],
                 ["See the guard's route","See the route for longer","See more of the route at once"],
                 ["Turn invisible","Stay invisible longer"],
                 ["Shrink to small sizes","Stay small for longer","Shrink smaller"],
                 ["Enter ghost mode","Stay in ghost mode for longer"]];
var friendCosts = [[0,0,0],
                  [[20,0,0],[20,2,2],[20,2,2]],//fast
                  [[60,0,2],[30,3,2],[30,3,2]],//mapper
                  [[120,0,2],[40,4,2]],//invisible
                  [[200,0,2],[50,5,2],[50,5,2]],//shrinker
                  [[300,0,2],[60,6,2]]];//phaser
var friendsBought = [[1,0,0],
                    [0,0,0],
                    [0,0,0],
                    [0,0],
                    [0,0,0],
                    [0,0]];

//booleans for what screen is up
var menuOn = true;
var gameOn = false;
var exitOn = false;
var winOn = false;
var loseOn = false;
var instOn = false;
var shopOn = false;
var retryOn = false;
var successOn = false;

//buttons for each screen
var menuButtons = [["Break In",240,190,150,40],
                  ["Instructions",240,250,150,40],
                  ["Recruit",240,310,150,40]];
var exitButtons = [["Break In Again",240,190,200,40],
                  ["Menu",240,250,80,40]];
var winButtons = [["Next Room",240,190,170,40],
                  ["Leave",240,250,80,40]];
var loseButtons = [["Break In Again",240,190,200,40],
                  ["Menu",240,250,80,40]];
var instButtons = [["Menu",100,70,80,40],
                  ["Next >>",380,420,100,40],
                  ["<< Back",100,420,100,40]];
var shopButtons = [["Menu",370,390,80,40]];
var retryButtons = [["Retry",240,250,80,40]];
var successButtons = [["Menu",240,340,80,40]];

//instructions
var instPage = 0;
var instructions = ["You have a mission that you have been planning for twelve years: break into the famous Museum of Expensive Items and rob everything in it. This is an incredibly lucrative job, but very dangerous. It will take skill, strategy, and patience.",
                    "The museum has seven rooms, each with twenty artifiacts. Each artifact in the first room is worth one thousand dollars, and the artifacts in each room after are worth a thousand dollars more than the one before. This means that, if you make it through all seven rooms, you will get away with more than half a million dollars worth of artifacts. However, it's a bit more tricky than that.",
                    "In order to enter into the next room, you have to navigate though the labrynthine, ever-changing room you are currently in, and take every artifact from it. If you get caught, you lose everything you stole. At any point, though, you can leave through the entrance you came in through, go home with what artifacts you got, and try again the next day.",
                   "Inside each room is a security guard. He follows a set route through the room, until he sees you, and then he will chase you. It is possible to evade him, if you make enough turns, but he is much faster than you, and he will almost always catch you. That is, unless you have help...",
                   "Once you make enough money, you can start looking for people to recruit. There are five people who would be willing, each with unique and helpful skills. However, you will have to pay them up front to join you, and pay for them to practice or improve their gadgets and technology if you want them to get better. These individuals are:",
                   "1. Runner\nHe can run far faster than you, even faster than guard. With more money, he can get faster, and run for longer periods of time.\n2. Mapper\nHe can hack into the security system, and view a short distance of the guard's route. With more money, he can view the route for longer, and view more of it at once.",
                   "3. Invisible Man\nHe can use advanced technology to turn himself invisible and evade the guard, but only for a short amount of time. With more money, he can stay invisible longer.\n4. Shrinker\nHe can use Pam Molecules, a substance discovered through years of scientific research, to shrink himself. With more money, he can shrink smaller, and stay shrunk for longer.",
                    "5. Ghost\nEven you do not know much about him or how his abilities came to be. He can enter into the mysterious Ghost Mode, and travel through walls. The guard can still see him in Ghost Mode, but it is very effective in evading capture and retrieving artifacts. With more money, he can stay in ghost mode for longer.",
                   "To change between people you recruit, press the 'a' and 'd' keys. To use their abilities, press the 's' key. When they use their abilities, they will change color. When they run out of time, or stop using them, their color will change back.",
                    "Good Luck"];

//limit the number of loops each part of building can take before stopping
var linesStop = 1000;//100
var pathsStop = 6000;//600
var failsStop = 30;//3
var coinsStop = 1000;//100
//limit how long it can build before stopping
var startBuild;
var stopBuild = 2000;

function resetGameVars(){
  playerX = 240;
  playerY = 470;
  diameter = realSize;
  leftExit = false;
  looped = [];
  linesEachTouching = [[1,3],[0,2],[1,3],[0,2]];
  lines = [[-5,0,485,0],[480,-5,480,485],[485,480,-5,480],[0,485,0,-5]];
  testingLines = [[-5,0,485,0],[480,-5,480,485],[485,480,-5,480],[0,485,0,-5]];
  pathPoints = [[240.5,10]];
  testing = true;
  bigTesting = true;
  pathDistance = 0;
  minXPoint = 255;
  maxXPoint = 0;
  minYPoint = 255;
  maxYPoint = 0;
  retryBuild = false;
  building = true;
  dotX = 240.5;
  dotY = 10;
  canSee = false;
  turning = true;
  toPoint = 0;
  goingToPoint = [];
  goingFromPoint = [];
  enemySpeed = 1;
  startChasing = false;
  chasing = false;
  chasingPath = [];
  toChasingPoint = 0;
  chasingDirection = 1;
  finishedChasing = false;
  lastSeen = [-1,-1];
  gotCoin = true;
  coins = [];
  nowLooped = [];
  friendOn = 0;
  for (var f = 0; f < friends.length; f ++){
    friends[f][4] = friends[f][5];
  }
}


function draw() {
  if (menuOn){
    background(220);
    textAlign(LEFT);
    text("Money: " + moneyString(money),10,20);
    textAlign(CENTER);
    textSize(50);
    text("HEIST",240,100);
    textSize(25);
    var choice = runButtons(menuButtons);
    if (choice == 0){
      menuOn = false;
      gameOn = true;
    }else if (choice == 1){
      instOn = true;
      menuOn = false;
    }else if (choice == 2){
      shopOn = true;
      menuOn = false;
    }
  }
  else if (exitOn){
    fill(255,255,255);
    strokeWeight(6);
    rect(240,240,300,350);
    strokeWeight(1);
    fill(0,0,0);
    text("You got " + moneyString(pointsGot) + " dollars",240,100);
    var choice = runButtons(exitButtons);
    if (choice == 0){
      exitOn = false;
      gameOn = true;
      money += pointsGot;
      pointsGot = 0;
    }else if (choice == 1){
      exitOn = false;
      menuOn = true;
      money += pointsGot;
      pointsGot = 0;
    }
  }
  else if (winOn){
    fill(255,255,255);
    strokeWeight(6);
    rect(240,240,300,350);
    strokeWeight(1);
    fill(0,0,0);
    text("You got every artifact",240,100);
    text("You have " + moneyString(pointsGot) + " dollars",240,130);
    var choice = runButtons(winButtons);
    if (choice == 0){
      winOn = false;
      gameOn = true;
      roomNum ++;
    }else if (choice == 1){
      winOn = false;
      menuOn = true;
      money += pointsGot;
      pointsGot = 0;
    }
  }
  else if (loseOn){
    fill(255,255,255);
    strokeWeight(6);
    rect(240,240,300,350);
    strokeWeight(1);
    fill(0,0,0);
    text("You got caught",240,100);
    var choice = runButtons(loseButtons);
    if (choice == 0){
      gameOn = true;
      loseOn = false;
    }else if (choice == 1){
      loseOn = false;
      menuOn = true;
    }
  }
  else if (instOn){
    background(220);
    fill(255,255,255);
    stroke(0,0,0);
    strokeWeight(6);
    rect(240,240,400,420);
    strokeWeight(1);
    stroke(255,255,255);
    fill(0,0,0);
    textSize(30);
    text("Instructions",240,70);
    textSize(20);
    text(instructions[instPage],240,240,380,400);
    text(25);
    var choice = -1;
    
    if (instPage > 0 && instPage < instructions.length-1){
      choice = runButtons(instButtons);
    }
    else if (instPage >= instructions.length - 1){
      choice = runButtons([instButtons[0],instButtons[2]]);
      choice *= 2;
    }
    else if (instPage == 0){
      choice = runButtons([instButtons[0],instButtons[1]]);
    }
    
    
    if (choice == 0){
      menuOn = true;
      instOn = false;
    }else if (choice == 1){
      instPage ++;
    }else if (choice == 2){
      instPage --;
    }
  }
  else if (retryOn){
    background(220);
    fill(255,255,255);
    stroke(0,0,0);
    strokeWeight(6);
    rect(240,240,300,350);
    strokeWeight(1);
    stroke(255,255,255);
    fill(0,0,0);
    text("Something went wrong",240,140);
    var choice = runButtons(retryButtons);
    if (choice == 0){
      resetGameVars();
      retryOn = false;
      gameOn = true;
    }
  }
  else if (successOn){
    fill(255,255,255);
    stroke(0,0,0);
    strokeWeight(6);
    rect(240,240,300,350);
    strokeWeight(1);
    stroke(255,255,255);
    fill(0,0,0);
    textSize(20);
    text("You succeeded!\nYou stole 560 thousand dollars worth of artifacts.\nYou can keep robbing this place, or run off to some foreign country and spend your well-earned money.",240,190,280,200);
    textSize(25);
    var choice = runButtons(successButtons);
    if (choice == 0){
      successOn = false;
      menuOn = true;
      money += pointsGot;
    }
  }
  else if (shopOn){
    background(220);
    var cl;
    fill(255,255,255);
    stroke(0,0,0);
    strokeWeight(6);
    rect(240,240,400,400);
    strokeWeight(1);
    stroke(255,255,255);
    fill(0,0,0);
    text("Shop",240,70);
    textSize(20);
    text("Money: " + moneyString(money),240,100);
    
    var yAt = 170;
    var xAt = 0;
    textSize(15);
    for (var sh = 1; sh < 6; sh ++){
      fill(255,255,255);
      stroke(0,0,0);
      xAt += 120;
      if (sh == 4){
        xAt = 120;
        yAt = 290
      }
      
      rect(xAt,yAt,80,100);
      var colNow = friends[sh][1];
      fill(colNow[0],colNow[1],colNow[2]);
      circle(xAt,yAt-15,15);
      fill(0,0,0);
      stroke(255,255,255);
      text(friends[sh][0],xAt,yAt-40);
      if (friendsBought[sh][0] > 0){
        
        var butToRun = [];
        var butNumsRun = [];
        for (var br = 1; br < friendBuys[sh].length; br ++){
          if (friends[sh][4+br] != friends[sh][6+br]){
            append(butToRun,[friendBuys[sh][br],xAt,yAt+10+(25*(br-1)),60,20]);
            append(butNumsRun,br);
          }
        }
        cl = runButtons(butToRun);
        
        if (cl > -1){
          cl = butNumsRun[cl];
        }
      }else{
        cl = runButtons([[friendBuys[sh][0],xAt,yAt+10,60,20]]);
      }
      if (cl > -1){
        friendClicked = [sh,cl];
      }
      
    }
    //if you click on an initial button, it opens a box with details and buy button
    if (friendClicked[0] > -1){
      stroke(0,0,0);
      fill(255,255,255);
      rect(360,290,100,100);
      stroke(255,255,255);
      fill(0,0,0);
      cl = friendClicked[1];
      sh = friendClicked[0];
      var nowCost = friendCosts[sh][cl][0] + friendCosts[sh][cl][1]*pow(friendsBought[sh][cl],friendCosts[sh][cl][2]);
      text("Cost: " + moneyString(nowCost),360,255);
      textSize(12);
      text(friendDesc[sh][cl],360,280,100,100);
      textSize(15);
      if (runButtons([["Buy",360,320,60,20]]) == 0 && !(cl == 0 && friendsBought[sh][cl] == 1)){
        if (money >= nowCost){
          money -= nowCost;
          friendsBought[sh][cl] ++;
          if (cl > 0){
            friends[sh][4+cl] += friends[sh][8+cl];
            if (friends[sh][4+cl] == friends[sh][6+cl]){
              friendClicked = [-1,-1];
            }
          }
          if (cl == 0 && friendsBought[sh][cl] == 1){
            friendClicked = [-1,-1];
          }
          
        }
      }
    }
    textSize(25);
    var choice = runButtons(shopButtons);
    if (choice == 0){
      menuOn = true;
      shopOn = false;
      friendClicked = [-1,-1];
    }
  }
  else if (gameOn){
    //initial setup *******************
    var runTimes = 0;
    if (lines.length == 4){
      startBuild = millis();
      while (building){
        testingLines.splice(4);
        looped = [];
        
        minXPoint = 480;
        maxXPoint = 0;
        minYPoint = 480;
        maxYPoint = 0;
        pathDistance = 0;
        pathPoints.splice(1);
        
        linesEachTouching = [[-5,0,485,0],[480,-5,480,485],[485,480,-5,480],[0,485,0,-5]];
        
        runTimes ++;
        building = false;
        
        
        //making lines
        for (var i = 4; i < lineAmount+4; i ++){
          var linesRun = 0;
          while (testing && gameOn){
            linesRun ++;
            
            testing = false;
            newX = random(0,480);
            newY = random(0,480);
            
            newAngle = random(0,360);
            if (circleTouching(newX,newY,newX + lineSize*cos(newAngle),newY + lineSize*sin(newAngle),playerX,playerY,realSize*2) || circleTouching(newX,newY,newX + lineSize*cos(newAngle),newY + lineSize*sin(newAngle),dotX,dotY,realSize)){
              testing = true;
            }else{
              
              
              newX1 = newX - extra*cos(newAngle);
              newY1 = newY - extra*sin(newAngle);
              newX2 = newX + (lineSize+extra)*cos(newAngle);
              newY2 = newY + (lineSize+extra)*sin(newAngle);
              
              
              
              // making sure there's no loops
              append(testingLines,[newX1,newY1,newX2,newY2]);
              append(lines,[newX,newY,newX + lineSize*cos(newAngle),newY + lineSize*sin(newAngle)]);
              
              if (makingALoop(i)){
                append(looped,[newX1,newY1,newX2,newY2]);
                
                lines.splice(i,1);
                testingLines.splice(i,1);
                
                testing = true;
              }
              
            }
            if (!testing && linesRun > linesStop){
              gameOn = false;
              retryOn = true;
              testing = true;
              console.log("Too many lines");
            }
            if (millis() - startBuild > stopBuild){
              testing = false;
              gameOn = false;
              retryOn = true;
              console.log("Timed out at lines");
            }
          }  
          testing = true;
          
        }
        
        linesEachTouching = makeTouchingList();
        
        //making path
        var i = 0;
        bigTesting = true;
        var bigRun = 0;
        while (bigTesting && gameOn){
          i ++;
          bigRun ++;
          while (testing && gameOn){
            testX = random(0,480);
            testY = random(0,480);
            if (!touchingAnyLine(testX,testY,20) && !crossingAnyLine(testX,testY,pathPoints[i-1][0],pathPoints[i-1][1]) && !passingOverAnyLine(testX,testY,pathPoints[i-1][0],pathPoints[i-1][1],20)){
              testing = false;
              append(pathPoints,[testX,testY]);
              if (testX < minXPoint)
                minXPoint = testX;
              if (testX > maxXPoint)
                maxXPoint = testX;
              if (testY < minYPoint)
                minYPoint = testY;
              if (testY > maxYPoint)
                maxYPoint = testY;
              pathDistance += getDistance(testX,testY,pathPoints[i-1][0],pathPoints[i-1][1]);
              if (pathPoints.length > minPathPoints && !crossingAnyLine(pathPoints[i][0],pathPoints[i][1],pathPoints[0][0],pathPoints[0][1]) && pathDistance > minPathDistance && maxXPoint-minXPoint >= spreadDistance && maxYPoint-minYPoint >= spreadDistance){
                bigTesting = false;
              }
            }
            if (pathPoints.length > 500){
              building = true;
              lines.splice(4);
              pathPoints.splice(1);
              testing = false;
              bigTesting = false;
            }
            if (millis() - startBuild > stopBuild){
              testing = false;
              gameOn = false;
              retryOn = true;
              console.log("Timed out at path");
            }
          }
          testing = true;
          if (!bigTesting && bigRun > pathsStop){
            gameOn = false;
            retryOn = true;
            bigTesting = true;
            console.log("Too many path points");
          }
          if (millis() - startBuild > stopBuild){
            testing = false;
            gameOn = false;
            retryOn = true;
            console.log("Timed out at failed");
          }
        }
        append(pathPoints,pathPoints[0]);
        if (runTimes > failsStop){
          building = false;
          gameOn = false;
          retryOn = true;
          console.log("Failed too many times");
        }
      }
      
      //setting coin positions
      testing = true;
      runTimes = 0;
      coins = [];
      for (var i = 0; i < coinAmount; i ++){
        testing = true;
        while (testing && gameOn){
          runTimes ++;
          testX = random(0,480);
          testY = random(0,480);
          testing = false;
          if (touchingAnyLine(testX,testY,coinDiameter)){
              testing = true;
            }
            
            for (var i = 0; i < coins.length; i ++){
              if (getDistance(testX,testY,coins[i][0],coins[i][1]) < 40){
                testing = true;
              }
            }
            
            if (runTimes > coinsStop){
              testing = true;
              i = 500;
              console.log("Coins failed");
              gameOn = false;
              retryOn = true;
          }
          if (millis() - startBuild > stopBuild){
            testing = false;
            gameOn = false;
            retryOn = true;
            console.log("Timed out at coins");
          }
        }
        append(coins,[testX,testY]);
      }
      for (var i = 0; i < lines.length; i ++){
        if (gameOn && makingALoop(i)){
          append(nowLooped,lines[i]);
        }
      }
    }
    
    
    
    
    background(185,185,185);
    fill(185,185,185);
    circle(240,470,realSize*2);
    var toColor;
    if (friends[friendOn][3]){
      toColor = friends[friendOn][2];
    }else{
      toColor = friends[friendOn][1];
    }
    fill(toColor[0],toColor[1],toColor[2]);
    circle(playerX,playerY,diameter);
    
    
    
    //draw enemy
    fill(0,0,0);
    circle(dotX,dotY,10);
    fill(255,255,255);
    
    
    
    //managing coins
    fill(240,200,50);
    for (var i = 0; i < coins.length; i ++){
      if (getDistance(coins[i][0],coins[i][1],playerX,playerY) < diameter/2 + 5){
        coins.splice(i,1);
        pointsGot += roomNum;
      }else{
        circle(coins[i][0],coins[i][1],10);
      }
    }
    fill(255,255,255);
    
    
    //moving enemy************
    
    //starts chasing again if it sees you when returning
    if (chasingDirection < 0 && canSee){
      chasingDirection = 1;
      
      chasingPath.splice(toChasingPoint+1);
      append(chasingPath,[dotX,dotY]);
      append(chasingPath,[playerX,playerY]);
      turning = true;
      toChasingPoint ++;
    }
    if (startChasing){
      chasing = true;
      startChasing = false;
      chasingPath = [];
      append(chasingPath,[dotX,dotY]);
      append(chasingPath,[playerX,playerY]);
      turning = true;
      chasingDirection = 1;
      toChasingPoint = 0;
      enemySpeed = enemyChaseSpeed;
    }
    if (chasing){//chasing at turn
      if (turning){
        
        toChasingPoint += chasingDirection;
        if (toChasingPoint == chasingPath.length){
          if (canSee){
            append(chasingPath,[playerX,playerY]);
          }else if(lastSeen[0] != -1){
            append(chasingPath,lastSeen);
            lastSeen = [-1,-1];
          }else{
            chasingDirection = -1;
            toChasingPoint += 2*chasingDirection;
          }
        }if (toChasingPoint == -1){
          chasing = false;
          toPoint --;
          finishedChasing = true;
        }else{
          
          goingFromPoints = chasingPath[toChasingPoint-chasingDirection];
          goingToPoints = chasingPath[toChasingPoint];
          dotX = goingFromPoints[0];
          dotY = goingFromPoints[1];
          
          enemyTurn();
          
          
          turning = false;
        }
        
        if (chasingDirection < 1)
          enemySpeed = enemyReturnSpeed;
        else
          enemySpeed = enemyChaseSpeed;
      }
    }
    if (turning && !chasing){//roaming at turn
      enemySpeed = enemyRoamSpeed;
      toPoint ++;
      if (toPoint == pathPoints.length){
        toPoint = 1;
      }
      
      if (!finishedChasing){
        dotX = pathPoints[toPoint-1][0];
        dotY = pathPoints[toPoint-1][1];
      }else{
        dotX = chasingPath[0][0];
        dotY = chasingPath[0][1];
      }
      
      goingFromPoints = pathPoints[toPoint-1];
      goingToPoints = pathPoints[toPoint];
      
      
      enemyTurn();
      
      turning = false;
      
    }
    dotX += enemyXSpeed;
    dotY += enemyYSpeed;
    if (enemyXSpeed != 0){
      if ((dotX-goingToPoints[0])/abs(dotX-goingToPoints[0]) == enemyXSpeed/abs(enemyXSpeed)){
        turning = true;
      }
    }
    else{
      if ((dotY-goingToPoints[1])/abs(dotY-goingToPoints[1]) == enemyYSpeed/abs(enemyYSpeed)){
        turning = true;
      }
    }
    
    //moving player
    if (keyIsPressed){
      var movedY = 0;
      var movedX = 0;
      
      if (keyIsDown(UP_ARROW)){
        if (keyIsDown(LEFT_ARROW)){
          movedY = 1/sqrt(2) * -1;
          movedX = 1/sqrt(2) * -1;
        }else if (keyIsDown(RIGHT_ARROW)){
          movedY = 1/sqrt(2) * -1;
          movedX = 1/sqrt(2);
        }else{
          movedY -= 1;
        }
      }else if (keyIsDown(DOWN_ARROW)){
        if (keyIsDown(LEFT_ARROW)){
          movedY = 1/sqrt(2);
          movedX = 1/sqrt(2) * -1;
        }else if (keyIsDown(RIGHT_ARROW)){
          movedY = 1/sqrt(2);
          movedX = 1/sqrt(2);
        }else{
          movedY += 1;
        }
      }
      else if (keyIsDown(RIGHT_ARROW)){
        movedX += 1;
      }else if (keyIsDown(LEFT_ARROW)){
        movedX -= 1;
      }
      playerX += movedX * speed;
      if (touchingAnyLine(playerX,playerY,diameter) && (!(friends[5][3] && friendOn == 5) || playerX >= 480-(diameter/2) || playerX <= diameter/2)){
        playerX -= movedX * speed;
      }
      playerY += movedY * speed;
      if (touchingAnyLine(playerX,playerY,diameter) && (!(friends[5][3] && friendOn == 5) || playerY >= 480-(diameter/2) || playerY <= diameter/2)){
        playerY -= movedY * speed;
      }
    }
    
    if (pressing && !keyIsDown(65) && !keyIsDown(68)){
      pressing = false;
    }
    if (keyIsDown(65) && !pressing){
      pressing = true;
      var testF = true;
      while (testF){
        friendOn --;
        if (friendOn < 0){
          friendOn = friends.length-1;
        }
        if (friendsBought[friendOn][0] == 1)
          testF = false;
      }
    }else if (keyIsDown(68) && !pressing){
      pressing = true;
      var testF = true;
      while (testF){
        friendOn ++;
        if (friendOn == friends.length){
          friendOn = 0;
        }
        if (friendsBought[friendOn][0] == 1)
          testF = false;
      }
    }
    
    if (friends[friendOn][4] > 0 && keyIsDown(83)){
      friends[friendOn][3] = true;
      friends[friendOn][4] --;
    }
    else{
      friends[friendOn][3] = false;
    }
    
    //fast friend
    if (friendOn == 1 && friends[1][3]){
      speed = friends[1][6];
    }else{
      speed = 2;
    }
    //map friend
    if (friendOn == 2 && friends[2][3]){
      var lastOne = [dotX,dotY];
      for(var s = toPoint; s < toPoint+friends[2][6]; s ++){
        var ss = s;
        if (s >= pathPoints.length){
          ss = s-pathPoints.length;
        }
        circle(pathPoints[ss][0],pathPoints[ss][1],10);
        line(pathPoints[ss][0],pathPoints[ss][1],lastOne[0],lastOne[1]);
        lastOne = [pathPoints[ss][0],pathPoints[ss][1]];
      }
    }
    //phase friend
    if (!friends[5][3] && touchingAnyLine(playerX,playerY,diameter)){
      friends[5][3] = true;
      if (friends[5][4] > 0){
        friends[5][4] --;
      }
    }
    //shrink friend
    if (friends[4][3] && friendOn == 4 && diameter > realSize - friends[4][6]){
      diameter -= 0.5;
    }else if (diameter < realSize && !touchingAnyLine(playerX,playerY,diameter+1)){
      diameter += 0.5;
    }
    
    
    
    //drawing the lines and testing if enemy can see
    canSee = true;
    stroke(0,165,0);
    strokeWeight(3);
    for (var i = 0; i < lines.length; i ++){
      
      var x1 = lines[i][0];
      var y1 = lines[i][1];
      var x2 = lines[i][2];
      var y2 = lines[i][3];
      var cx = playerX;
      var cy = playerY;
      
      line(lines[i][0],lines[i][1],lines[i][2],lines[i][3]);
      
      if (linesCrossing(x1,y1,x2,y2,dotX,dotY,playerX,playerY) || mouseIsPressed){
        canSee = false;
      }
    }
    if (passingOverAnyLine(dotX,dotY,playerX,playerY,10)){
      canSee = false;
    }
    var couldSee = true;
    if (friends[3][3] && friendOn == 3){
      canSee = false;
      couldSee = false;
    }
    if (touchingAnyLine(playerX,playerY,diameter)){
      canSee = false;
      couldSee = false;
    }
    stroke(0,0,0);
    strokeWeight(1);
    if (canSee && !chasing && !finishedChasing){
      startChasing = true;
    }
    if (finishedChasing){
      finishedChasing = false;
    }
    //Losing **************
    if (getDistance(dotX,dotY,playerX,playerY) < diameter/2 + 5){
      gameOn = false;
      loseOn = true;
      pointsGot = 0;
      resetGameVars();
      roomNum = 1;
    }
    //as the enemy is chasing, if it reaches the last point the player was seen and can't see the player, it goes to the last place the player was seen from the point the enemy is currently at
    if (chasing && /*!(friends[2][3] && friendOn == 2)*/couldSee){
      if (!crossingAnyLine(chasingPath[toChasingPoint][0],chasingPath[toChasingPoint][1],playerX,playerY)){
        if (!passingOverAnyLine(chasingPath[toChasingPoint][0],chasingPath[toChasingPoint][1],playerX,playerY,10)){
          lastSeen = [playerX+0.00001,playerY+0.00001];
        }
      }
    }
    
    //when chasing, if you get closer to the enemy than the point he is approaching, he changes direction toward you
    if (chasing && canSee && couldSee && chasingDirection > 0 && getDistance(dotX,dotY,playerX,playerY) < getDistance(dotX,dotY,chasingPath[toChasingPoint][0],chasingPath[toChasingPoint][1])){
      chasingPath.splice(toChasingPoint);
      append(chasingPath,[dotX,dotY]);
      append(chasingPath,[playerX,playerY]);
      turning = true;
    }
    
    
    //Finishing Game *********
    if (!leftExit){
      if (getDistance(playerX,playerY,240,470) > diameter){
        leftExit = true;
      }
    }else if (getDistance(playerX,playerY,240,470) <= diameter/2){
      if (coins.length == 0 && roomNum == 7){
        successOn = true;
        roomNum = 1;
      }
      else if (coins.length == 0){
        winOn = true;
      }else{
        exitOn = true;
        roomNum = 1;
      }
      gameOn = false;
      resetGameVars();
    }
    
    
  }
}



// **************** Functions *****************************

//inputs coordinates of a line and a circle and the circle's diamter
//outputs boolean for if circle is touching the line
function circleTouching(x1,y1,x2,y2,cx,cy,di){
  var side1 = sqrt(pow(x1-x2,2)+pow(y1-y2,2));
  var side2 = sqrt(pow(x1-cx,2)+pow(y1-cy,2));
  var side3 = sqrt(pow(cx-x2,2)+pow(cy-y2,2));
  var s = (side1+side2+side3)/2;
  var area = sqrt(s * (s-side1) * (s-side2) * (s-side3));
  var height = 2 * area / side1;
  if (height < di/2 && side2-side1 < di/2 && side3-side1 < di/2){
    return true;
  }else{
    return false;
  }
}

//inputs coordinates for two lines
//outputs boolean for if they are crossing
function linesCrossing(ax1,ay1,ax2,ay2,bx1,by1,bx2,by2){
  var ma;
  var mb;
  if (ax1-ax2 == 0)
    ax2 += 0.00001;
  ma = (ay1-ay2)/(ax1-ax2);
  if (bx1-bx2 == 0)
    bx2 += 0.00001;
  mb = (by1-by2)/(bx1-bx2);
  var ba = ay1-(ma*ax1);
  var bb = by1-(mb*bx1);
  var crossX = (ba-bb)/(mb-ma);
  var crossY = ma * crossX + ba;
  
  if ((ax1 == ax2 || (crossX-ax1)*(crossX-ax2) <= 0) && (bx1 == bx2 || (crossX - bx1)*(crossX-bx2) <= 0) && (ay1 == ay2 || (crossY-ay1)*(crossY-ay2) <= 0) && (by1 == by2 || (crossY-by1)*(crossY-by2) <= 0)){
    return true;
  }else{
    return false;
  }
}

//inputs circle coordinates and diameter
//ouputs boolean for if it is touching any line in "lines" array
function touchingAnyLine(xVal,yVal,dVal){
  for (var ii = 0; ii < lines.length; ii ++){
    if (circleTouching(lines[ii][0],lines[ii][1],lines[ii][2],lines[ii][3],xVal,yVal,dVal)){
      return true;
    }
  }
  return false;
}

//inputs coordinates for a line
//outputs boolean for if it is crossing any line in the "lines" array
function crossingAnyLine(x1Val,y1Val,x2Val,y2Val){
  for (var ii = 0; ii < lines.length; ii ++){
    if (linesCrossing(x1Val,y1Val,x2Val,y2Val,lines[ii][0],lines[ii][1],lines[ii][2],lines[ii][3])){
      return true;
    }
  }
  return false;
}

//inputs two coordinate points, outputs their distance
function getDistance(x1Val,y1Val,x2Val,y2Val){
  return sqrt(pow(x1Val-x2Val,2) + pow(y1Val-y2Val,2));
}

//called to set "enemyXSpeed" and "enemyYSpeed" variables when enemy is turning
function enemyTurn(){
  direction = atan((goingToPoints[1]-goingFromPoints[1])/(goingToPoints[0]-goingFromPoints[0]));
  
  enemyXSpeed = abs(enemySpeed*cos(direction));
  if (enemyXSpeed != 0 && (goingToPoints[0]-goingFromPoints[0]) != 0){
    enemyXSpeed *= (goingToPoints[0]-goingFromPoints[0])/abs(goingToPoints[0]-goingFromPoints[0]);
  }else{
    enemyXSpeed = 0;
  }
  
  enemyYSpeed = abs(enemySpeed*sin(direction));
  if (enemyYSpeed != 0 && (goingToPoints[1]-goingFromPoints[1]) != 0){
    enemyYSpeed *= (goingToPoints[1]-goingFromPoints[1])/abs(goingToPoints[1]-goingFromPoints[1]);
  }else{
    enemyYSpeed = 0;
  }
}

//inputs coordinates for two circles and a diameter
//outputs array of coordinates for two lines
//lines are parallel to and radius distance from line between centers of each circle
function circlePoints(x1,y1,x2,y2,diVal){
  var ang = atan((y2-y1)/(x2-x1));
  var x1a = x1 + ((diVal/2) * cos(ang+90));
  var y1a = y1 + ((diVal/2) * sin(ang+90));
  var x2a = x2 + ((diVal/2) * cos(ang+90));
  var y2a = y2 + ((diVal/2) * sin(ang+90));
  
  var x1b = x1 + ((diVal/2) * cos(ang-90));
  var y1b = y1 + ((diVal/2) * sin(ang-90));
  var x2b = x2 + ((diVal/2) * cos(ang-90));
  var y2b = y2 + ((diVal/2) * sin(ang-90));
  
  return [[x1a,y1a,x2a,y2a],[x1b,y1b,x2b,y2b]];
}

//inputs two circle coordinates and a diameter
//outputs boolean for if one circle can travel in a straight line to the other without touching any lines
function passingOverAnyLine(x1,y1,x2,y2,diVal){
  var parLines = circlePoints(x1,y1,x2,y2,diVal);
  if (crossingAnyLine(parLines[0][0],parLines[0][1],parLines[0][2],parLines[0][3],diVal)){
    return true;
  }
  if (crossingAnyLine(parLines[1][0],parLines[1][1],parLines[1][2],parLines[1][3],diVal)){
    return true;
  }
  if (crossingAnyLine(parLines[0][0],parLines[0][1],parLines[1][2],parLines[1][3])){
    return true;
  }
  if (crossingAnyLine(parLines[0][2],parLines[0][3],parLines[1][0],parLines[1][1])){
    return true;
  }
  return false;
}

//inputs an index value for "linesEachTouching" array
//outputs boolean for if line at given index is forming a loop with other lines, using "linesEachTouching" array
function makingALoop(index){
  var eachTouching = makeTouchingList();
  
  var going = true;
  while(going){
    going = false;
    for (var m = 0; m < eachTouching.length; m ++){
      if (eachTouching[m].length == 1){
        going = true;
        var tNum = eachTouching[m][0];
        var chopNum = -1;
        //console.log("Chopping " + m + " from " + tNum + "'s [" + linesEachTouching[tNum] + "]");
        for (var n = 0; n < eachTouching[tNum].length; n ++){
          if (eachTouching[tNum][n] == m){
            chopNum = n;
          }
        }
        if (chopNum == -1){
          console.log("wrong");
        }else{
          eachTouching[tNum].splice(chopNum,1);
          //console.log(">" + tNum + ": " + linesEachTouching[tNum]);
        }
        eachTouching[m] = [];
      }
    }
  }
  if (eachTouching[index].length == 0){
    return false;
  }else{
    return true;
  }
}

//inputs coordinate points for two lines
//outputs array of coordinate points for where the two lines touch
//if they do not touch, outputs -1
function linesCrossingAt(ax1,ay1,ax2,ay2,bx1,by1,bx2,by2){
  var ma;
  var mb;
  if (ax1-ax2 == 0)
    ax2 += 0.00001;
  ma = (ay1-ay2)/(ax1-ax2);
  if (bx1-bx2 == 0)
    bx2 += 0.00001;
  mb = (by1-by2)/(bx1-bx2);
  var ba = ay1-(ma*ax1);
  var bb = by1-(mb*bx1);
  var crossX = (ba-bb)/(mb-ma);
  var crossY = ma * crossX + ba;
  
  if ((crossX-ax1)*(crossX-ax2) <= 0 && (crossX - bx1)*(crossX-bx2) <= 0 && (crossY-ay1)*(crossY-ay2) <= 0 && (crossY-by1)*(crossY-by2) <= 0){
    return [crossX,crossY];
  }else{
    return -1;
  }
}

//inputs the coordinate points for two lines, and a distance
//outputs boolean for if the points of either line are dist distance away from the other line
//used to prevent loops with parallel lines, whose extended ends still do not touch, but cannot be passed between
function linesAreTouching(ax1,ay1,ax2,ay2,bx1,by1,bx2,by2,dist){
  dist *= 2;
  if (circleTouching(ax1,ay1,ax2,ay2,bx1,by1,dist))
    return true;
  if (circleTouching(ax1,ay1,ax2,ay2,bx2,by2,dist))
    return true;
  if (circleTouching(bx1,by1,bx2,by2,ax1,ay1,dist))
    return true;
  if (circleTouching(bx1,by1,bx2,by2,ax2,ay2,dist))
    return true;
  return false;
}

function makeTouchingList(){
  var linesTouching = [];
  for (var a = 0; a < testingLines.length; a ++){
    append(linesTouching,[]);
    for (var x = 0; x < testingLines.length; x ++){
      if (a != x && (linesCrossing(testingLines[a][0],testingLines[a][1],testingLines[a][2],testingLines[a][3],testingLines[x][0],testingLines[x][1],testingLines[x][2],testingLines[x][3]) || linesAreTouching(lines[a][0],lines[a][1],lines[a][2],lines[a][3],lines[x][0],lines[x][1],lines[x][2],lines[x][3],extra))){
        append(linesTouching[a],x);
      }
    }
  }
  return linesTouching;
}

//input 2D array, each inner array having [String word,x int,y int,width int,height int]
//outputs index of which button is clicked, -1 if none
function runButtons(buttons){
  if (!mouseIsPressed)
    clicking = false;
  var answer = -1;
  var butW;
  var butH;
  var mouseOn = false;
  for (var i = 0; i < buttons.length; i ++){
    var word = buttons[i][0];
    var butX = buttons[i][1];
    var butY = buttons[i][2];
    var butWidth = buttons[i][3];
    var butHeight = buttons[i][4];
    
    if (mouseX < butX + (butWidth/2) && mouseX > butX - (butWidth/2) && mouseY < butY + (butHeight/2) && mouseY > butY - (butHeight/2) && !clicking){
      fill(230,230,230);
      mouseOn = true;
    }else{
      fill(255,255,255);
      mouseOn = false;
    }
    
    if (mouseOn && mouseIsPressed){
      butW = butWidth - 2;
      butH = butHeight - 2;
      answer = i;
      clicking = true;
    }else{
      butW = butWidth;
      butH = butHeight;
    }
    
    stroke(0,0,0);
    strokeWeight(2);
    rect(butX,butY,butW,butH);
    noStroke();
    strokeWeight(1);
    fill(0,0,0);
    text(word,butX,butY);
  }
  return answer;
}

function moneyString(cash){
  var costStrings = ["K","M","B"];
  var newMoney = cash;
  if (newMoney == 0)
    return 0;
  var costAt = 0;
  while (newMoney >= 1000){
    costAt ++;
    newMoney /= 1000;
  }
  if (costAt >= costStrings.length)
    return "A Whole Lot";
  return newMoney + costStrings[costAt];
}

