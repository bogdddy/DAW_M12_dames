$(document).ready(() => {

  function checkOrientation() {
    if (screen.orientation.type == "landscape-primary") {
      $('#myModal').modal('show');
      screen.orientation.lock("landscape-primary");
    }
  }

  $(window).on("orientationchange", checkOrientation);

  startGame();

  function startGame(p1 = "player1", p2 ="player2", p1color = "white", p2color="black"){

      let player1 = new Player("player1", "white");
      let player2 = new Player("player2", "black");

      let game = new Game(player1, player2);

      console.log(game);
      console.log(game.board);
      
      game._playing = true;
      game.fillBoard(); // logically add cells() and pieces
      game.board.printBoard(); // print board
      game.addEventsToBoard(); // add listeners to boards
     
      // test cases
      let myCell = game.getCell(4, 3);
      myCell.piece=(new Piece("black"));
      $("#4-3").html(`<img class="img-fluid" src="./resources/images/piece_black.png"></img>`);
  
      // console.log(game.getCell(6, 3));
      
      // game.getCell(6, 3).piece = null;
      // console.log(game.getCell(6, 3).piece);
      // $("#6-3").empty();
      
      // game.getCell(7, 4).piece = null;
      // console.log(game.getCell(7, 4).piece);
      // $("#7-4").empty();
  
      // myCell = game.getCell(7, 4);
      // myCell.piece=(new Piece("white"));
      // $("#7-4").html(`<img class="img-fluid" src="./resources/images/piece_white.png"></img>`);
      
      // myCell = game.getCell(5, 4);
      // myCell.piece=(new Piece("white"));
      // $("#5-4").html(`<img class="img-fluid" src="./resources/images/piece_white.png"></img>`);
      
      // myCell = game.getCell(5, 2);
      // myCell.piece=(new Piece("white"));
      // $("#5-2").html(`<img class="img-fluid" src="./resources/images/piece_white.png"></img>`);
  
      // console.log(game._board);
  
      // game.changeTurn();
  }
  
})
