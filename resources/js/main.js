$(document).ready(() => {


    let player1 = new Player("player1", "white");
    let player2 = new Player("player2", "black");
    
    let game = new Game(player1, player2);

    console.log(player1);
    console.log(game.turn);
    game.changeTurn();
    console.log(game.turn);
    
    game.board.printBoard();
    game.fillBoard();
    console.log(game.board);

})
