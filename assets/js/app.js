$(document).ready(function(){
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB44f_X7HOxqQsBZsIBin_0FWqe2GDo434",
    authDomain: "rps-mulitplayer-6ec8e.firebaseapp.com",
    databaseURL: "https://rps-mulitplayer-6ec8e.firebaseio.com",
    projectId: "rps-mulitplayer-6ec8e",
    storageBucket: "",
    messagingSenderId: "36534449487"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  
//local game object
  var game = {
    playerOne: "",
    playerTwo: "",
    playerOneScore: 0,
    playerTwoScore: 0,
    playerOneChoice: "",
    playerTwoChoice: ""
  };
//declare current player, which will later be set to playerOne or playerTwo
  var thisPlayer;
//initial functions called on ready
  update();
  checkForPlayers();


//---------//functions//----------//

//reset database to start a new game
  function resetDB(){
    var newGame = {
    playerOne: "",
    playerTwo: "",
    playerOneScore: 0,
    playerTwoScore: 0,
    playerOneChoice: "",
    playerTwoChoice: ""
    };
    database.ref("RPS/").set(newGame);
    update();
  }

//update local game object to reflect values in database
  function update(){
    console.log("update() called.");
    database.ref("RPS/").once("value")
      .then(function(snapshot){
        var data = snapshot.val();
        game.playerOne = data.playerOne;
        game.playerTwo = data.playerTwo;
        game.playerOneScore = data.playerOneScore;
        game.playerTwoScore = data.playerTwoScore;
        game.playerOneChoice = data.playerOneChoice;
        game.playerTwoChoice = data.playerTwoChoice;
        console.log("local game = ", game);
        $("#playerOneName").html("<h3>"+game.playerOneName+"<h3>");
        $("#playerTwoName").html("<h3>"+game.playerTwoName+"<h3>");

    })
  }

//make sure both players are logged in
  function checkForPlayers(){
    console.log("checkForPlayers() called.");
    console.log(/\w/.test(game.playerOne));
    if(!/\w/.test(game.playerOne)){
      playerLogin("playerOne");
    }else if (!/\w/.test(game.playerTwo)){
      playerLogin("playerTwo");
    }
    startGame();
    
  }



//prompt player for name and display it
  function playerLogin(player){
    thisPlayer = player;
    console.log("playerOneLogin() called.");
    var input = $("<input type='text' id='nameInput'>");
    var submit = $("<button class='submit'>enter name to begin</submit>");
    $("#"+player+"Name").append(input).append(submit);
    $(document).on("click", "button.submit", function(){
      var name = $("#nameInput").val();
      console.log("click");
      database.ref("RPS/").set({player:name});
      update();
    })
  }

  function startGame(){
    console.log("Game started!");
  }












});//end of .ready()
