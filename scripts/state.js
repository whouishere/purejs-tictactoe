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
 * game turn (cross or circle/player 1 or 2) enum
 */
const GameTurn = Object.freeze({
	cross: 1, 
	circle: 2
});

/**
 * game state enum
 */
const GameState = Object.freeze({
	running: 0, 
	victory: 1, 
	draw: 2
});

/**
 * string literals for game text enum
 */
const GameText = Object.freeze({
	player1: "Player 1 (X)", 
	player2: "Player 2 (O)", 
	invalid: "Invalid choice!", 
	draw: "It's a draw!", 
	cross: "X", 
	circle: "O", 
	empty_class: "empty", 
	used_class: "used"
});

const MagicSquare = Object.freeze([
	8, 1, 6, 
	3, 5, 7, 
	4, 9, 2
]);

let gameEnded = false;
let turn = GameTurn.cross;
// populate board array with HTMLElements
let board = Array.from({length: 9}, (_, i) => util.getId(`pos${i + 1}`));
Object.seal(board);

let turnText = util.getId('player-turn');
turnText.innerHTML = util.getPlayerText();
let resetButton = util.getId('play-again');
