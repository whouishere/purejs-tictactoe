/* 
 * Copyright © 2022  Willian Vinagre
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

var turn = 1;

function pos(choice) {
	return document.getElementById(choice);
}

function run() {
	turnCheck();
}

function turnCheck() {
	switch (turn) {
		case 1:
			document.getElementById("player-turn").innerHTML = "Player 1 (X)";
			break;
		case 2:
			document.getElementById("player-turn").innerHTML = "Player 2 (O)";
			break;
		default:
			// if, for some reason, the turn value isn't 1 or 2, show as error in the console
			console.log(`turnCheck() error. turn = ${turn}`);
	}
}

// changes the game board and its state
function play(choice) {
    if (state() == 0) {  // if the game is still going
		// and if it's player 1 / cross turn
        if (turn == 1) {
			// if the player chose somewhere that still has an 'X' or 'O', show "invalid choice" and do nothing
            if (document.getElementById(choice).innerHTML == "X" || document.getElementById(choice).innerHTML == "O") {
                document.getElementById("player-turn").innerHTML = "Invalid choice!";
            } else { // otherwise, change the player choice on the board to 'X'
                document.getElementById(choice).innerHTML = "X";
                turn++; // change turn
				turnCheck(); // change the turn on the screen to show the next player's turn
            }
        }
        else if (turn == 2) { // or if is player 2 / circle turn
			// if the player chose somewhere that still has an 'X' or 'O', show "invalid choice" and do nothing
            if (document.getElementById(choice).innerHTML == "X" || document.getElementById(choice).innerHTML == "O") {
                document.getElementById("player-turn").innerHTML = "Invalid choice!";
            } else { // otherwise, change the player choice on the board to 'O'
                document.getElementById(choice).innerHTML = "O";
                turn--; // change turn
				turnCheck(); // change the turn on the screen to show the next player's turn
            }
        }
    }

    if (state() == 1) { //if a victory happened
		// this may be confusing, since it looks like if player 1 won, show "player 2 won".
		// I just did that because when a player ends its turn, the game changes the turn to the next player.
		// so I had to invert who won, otherwise it will show that the other player won, not the one that did the last play.
        if (turn == 1) {
            document.getElementById("player-turn").innerHTML = "Player 2 won!";
            document.getElementById("play-again").style.display = "block";
        }
		else if (turn == 2) {
            document.getElementById("player-turn").innerHTML = "Player 1 won!";
            document.getElementById("play-again").style.display = "block";
        }
    }

    else if (state() == 2) { // or if a draw happened
        document.getElementById("player-turn").innerHTML = "It's a draw!";
        document.getElementById("play-again").style.display = "block"; // show the "play again" button
    }
}

function state() { // function that checks every possible win combination and updates the game state.
	// return as 0 = the game is still ongoing
	// return as 1 = victory
	// return as 2 = it's a draw
	
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

function repeat() { // reset the game to another round
	// reset every position on the game board
    pos("pos1").innerHTML = "1";
    pos("pos2").innerHTML = "2";
    pos("pos3").innerHTML = "3";
    pos("pos4").innerHTML = "4";
    pos("pos5").innerHTML = "5";
    pos("pos6").innerHTML = "6";
    pos("pos7").innerHTML = "7";
    pos("pos8").innerHTML = "8";
    pos("pos9").innerHTML = "9";
    
    turn = 1; // reset the game turn

    document.getElementById("play-again").style.display = "none"; // hide the "play again" button
	
	turnCheck(); // reset the turn shown at the screen
}

run();