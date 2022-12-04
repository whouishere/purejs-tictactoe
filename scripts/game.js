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

/**
 * Changes the board based on last choice
 * @param {HTMLElement} choice The selected board position
 */
function play(choice) {
	if (turn !== GameTurn.cross && turn !== GameTurn.circle) {
		// if, for some reason, the turn isn't cross nor circle, report error to the console
		console.log(`error on running GameTurn check. turn = ${turn}`);
	} else if (choice.className === GameText.empty_class) {
		// change selected position text to cross, set as used, and change turn
		choice.innerHTML = util.getTurnChar();
		choice.className = GameText.used_class;
		turn = util.getNextTurn();
		turnText.innerHTML = util.getPlayerText();

		switch (getGameState()) {
			case GameState.running: break;
			case GameState.victory: {
				// had to invert which player won based in current turn because
				// when checking who won, the turn is already changed to the loser
				turnText.innerHTML = `${GameText[`player${util.getNextTurn()}`]} won!`;
				resetButton.style.display = "block"; // show reset button
				break;
			}
			case GameState.draw: {
				turnText.innerHTML = GameText.draw;
				resetButton.style.display = "block"; // show reset button
				break;
			}
			default:
				// if, for some reason, game state isn't 'running', 'victory' nor 'draw', report error to the console
				console.log(`error on runnning GameState check. getGameState() = ${getGameState()}`);
				break;
		}
	} else {

		turnText.innerHTML = GameText.invalid;
	}
}

/**
 * Scans the board to check any possible win sequence. 
 * If the entire board is filled but there's no win sequence, declare it a draw.
 * @returns GameState enum, with the current game status (running, victory or draw)
 */
function getGameState() {
	// create an array with every board value string
	let position = Array.from({length: 9}, (_, i) => board[i].innerHTML);
	Object.seal(position);

	let used = 0;

	// scans entire board for triple combinations and checks it with a magic square
	// https://mathworld.wolfram.com/MagicSquare.html
	for (let i = 0; i < position.length; i++) {
		// checks if any positions were used
		if (position[i] === GameText.circle || position[i] === GameText.cross) {
			used++;
		}

		for (let j = i + 1; j < position.length; j++) {
			for (let k = j + 1; k < position.length; k++) {
				if (util.isTriple([position[i], position[j], position[k]]) && 
					MagicSquare[i] + MagicSquare[j] + MagicSquare[k] === 15) {
						return GameState.victory;
					}
			}
		}
	}

	// if all positions were used, but no victory was triggered, consider it a draw
	if (used === 9) {
		return GameState.draw;
	}

	return GameState.running;
}

function reset() { 
	// reset every position on the game board
	board.forEach((value, index) => {
		value.innerHTML = (index + 1).toString();
		value.className = GameText.empty_class;
	});
    
    turn = util.getNextTurn(); // reset the game turn
    resetButton.style.display = "none"; // hide the "play again" button

	turnText.innerHTML = util.getPlayerText(); // redraw turn
}
