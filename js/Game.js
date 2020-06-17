class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200,40,40);
    player2 = createSprite(100,400,40,40);
    player3 = createSprite(100,600,40,40);
    player4 = createSprite(100,800,40,40);
    players = [player1, player2, player3, player4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
     // background("brown");
      
      //index of the array
      var index = 0;

      //x and y position of players
      var x;
      var y = 100;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the players a little away from each other in y direction
        y = y + 100;
        //use data form the database to display the players in x direction
        x = displayWidth - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;

        if (index === player.index){
          players[index - 1].shapeColor = "red";
          camera.position.x = players[index-1].x
          camera.position.y = players[index-1].y
        }
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

if(player.distance>=1000){
  gameState = 2;
}

    drawSprites();
  }
  end(){
    game.update(2);
    console.log("game ended");
  }
}


