var turn = 1; //players' turn. 1 = cross; 2 = circle.

var pos = function (id) { //function to take off the need to type document.getElementById() everytime in the state() and repeat() function, so it doesn't look messy. (I know that it looks messy anyway lol)
    return document.getElementById(id);
};

function turnCheck() //function that checks the game turn.
{
	if (turn == 1) {
		document.getElementById("playerTurn").innerHTML = "Player 1 (X)";
	}
	
	else if (turn == 2) {
		document.getElementById("playerTurn").innerHTML = "Player 2 (O)";
	}
	
	else { //if, for some reason, the turn function isn't 1 or 2, show as error in the console
		console.log("Player turn error");
	}
}

function play(choice) //when the player clicks on the board, this function changes the game board and state
{
    if (state() == 0) //if the game is still going
    {
        if (turn == 1) //and if is player 1 / cross turn
        {
			//if the player chose somewhere that still has an 'X' or 'O', show "invalid choice" and do nothing
            if (document.getElementById(choice).innerHTML == "X" || document.getElementById(choice).innerHTML == "O")
            {
                document.getElementById("playerTurn").innerHTML = "Invalid choice!";
            }
			
			//otherwise, change the player choice on the board to 'X'
            else
            {
                document.getElementById(choice).innerHTML = "X";
                turn++; //change turn
				turnCheck(); //change the turn on the screen to show the next player's turn
            }
        }

        else if (turn == 2) //or if is player 2 / circle turn
        {
			//if the player chose somewhere that still has an 'X' or 'O', show "invalid choice" and do nothing
            if (document.getElementById(choice).innerHTML == "X" || document.getElementById(choice).innerHTML == "O")
            {
                document.getElementById("playerTurn").innerHTML = "Invalid choice!";
            }
			
			//otherwise, change the player choice on the board to 'O'
            else
            {
                document.getElementById(choice).innerHTML = "O";
                turn--; //change turn
				turnCheck(); //change the turn on the screen to show the next player's turn
            }
        }
    }

    if (state() == 1) //if a victory happened
    { 
		//this may be confusing, since it looks like if player 1 won, show "player 2 won".
		//I just did that because when a player ends its turn, the game changes the turn to the next player.
		//so I had to invert who won, otherwise it will show that the other player won, not the one that did the last play.
        if (turn == 1) {
			
            document.getElementById("playerTurn").innerHTML = "Player 2 won!";
            document.getElementById("playAgain").style.display = "block";
        }
		else if (turn == 2) {
            document.getElementById("playerTurn").innerHTML = "Player 1 won!";
            document.getElementById("playAgain").style.display = "block";
        }
    }

    else if (state() == 2) //or if a draw happened
    {
        document.getElementById("playerTurn").innerHTML = "It's a draw!";
        document.getElementById("playAgain").style.display = "block"; //show the "play again" button
    }
}

function state() //function that checks every possible win combination and updates the game state.
{
	//return as 0 = the game is still ongoing
	//return as 1 = victory
	//return as 2 = it's a draw
	
    if (pos("pos1").innerHTML == pos("pos2").innerHTML && pos("pos2").innerHTML == pos("pos3").innerHTML){
		return 1;
		}
		
	else if (pos("pos4").innerHTML == pos("pos5").innerHTML && pos("pos5").innerHTML == pos("pos6").innerHTML){
		return 1;
		}
		
	else if (pos("pos7").innerHTML == pos("pos8").innerHTML && pos("pos8").innerHTML == pos("pos9").innerHTML){
		return 1;
		}
		
	else if (pos("pos1").innerHTML == pos("pos4").innerHTML && pos("pos4").innerHTML == pos("pos7").innerHTML){
		return 1;
		}
		
	else if (pos("pos2").innerHTML == pos("pos5").innerHTML && pos("pos5").innerHTML == pos("pos8").innerHTML){
		return 1;
		}
		
	else if (pos("pos3").innerHTML == pos("pos6").innerHTML && pos("pos6").innerHTML == pos("pos9").innerHTML){
		return 1;
		}
		
	else if (pos("pos1").innerHTML == pos("pos5").innerHTML && pos("pos5").innerHTML == pos("pos9").innerHTML){
		return 1;
		}
		
	else if (pos("pos3").innerHTML == pos("pos5").innerHTML && pos("pos5").innerHTML == pos("pos7").innerHTML){
		return 1;
		}
		
	else if (pos("pos1").innerHTML != '1' && pos("pos2").innerHTML != '2' && pos("pos3").innerHTML != '3' && pos("pos4").innerHTML != '4' && pos("pos5").innerHTML != '5' && pos("pos6").innerHTML != '6' && pos("pos7").innerHTML != '7' && pos("pos8").innerHTML != '8' && pos("pos9").innerHTML != '9'){
		return 2;
		}
		
	else {
	return 0;
	}
}

function repeat() //reset the game to another round
{
	//reset every position on the game board
    pos("pos1").innerHTML = "1";
    pos("pos2").innerHTML = "2";
    pos("pos3").innerHTML = "3";
    pos("pos4").innerHTML = "4";
    pos("pos5").innerHTML = "5";
    pos("pos6").innerHTML = "6";
    pos("pos7").innerHTML = "7";
    pos("pos8").innerHTML = "8";
    pos("pos9").innerHTML = "9";
    
    turn = 1; //reset the game turn

    document.getElementById("playAgain").style.display = "none"; //hide the "play again" button
	
	turnCheck(); //reset the turn shown at the screen
}