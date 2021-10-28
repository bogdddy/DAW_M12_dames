$(document).ready(() => {


    let player1 = new Player("player1", "white");
    let player2 = new Player("player2", "black");
    
    let game = new Game(player1, player2);

    console.log(game.board);
    
    game.fillBoard();
    game.board.printBoard();
    game.addEventsToBoard();

    // // GAME
    // while (player1.pieces > 0 && player2.pieces > 0 && !victory){


    //     // TURN 
    //     if (game.turn.color == game.board. )

    // }

    // let myCell = game.getCell(4, 3);
    // myCell.piece=(new Piece("black"));
    // $("#4-3").html(`<img class="img-fluid" src="./resources/images/piece_black.png"></img>`);


    // let aaa = "+";

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

    console.log(game._board)

    


    // game.changeTurn();
})
