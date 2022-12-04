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

const util = {
	/**
	 * check if an array is an equal triple
	 * @param {Array} triple
	 * @returns `true` if every element is equal to each other
	 */
	isTriple: (triple) => {
		triple.length = 3;
		return triple[0] === triple[1] && triple[0] === triple[2];
	}, 

	/**
	 * shortner utility
	 * @param {string} elementId HTML id of the desired element
	 * @returns The selected element `HTMLElement` object
	 */
	getId: (elementId) => {
		return document.getElementById(elementId);
	},
	
	/**
	 * get next turn based on current one
	 * @returns `GameTurn` enum value
	 */
	getNextTurn: () => {
		return turn === GameTurn.cross ? GameTurn.circle : GameTurn.cross;
	},

	/**
	 * get current player text string
	 * @returns `GameText` string
	 */
	getPlayerText: () => {
		return GameText[`player${turn}`];
	},

	/**
	 * get current turn player's char (X or O)
	 * @returns `GameTurn.cross` or `GameTurn.circle` string
	 */
	getTurnChar: () => {
		return [GameText.cross, GameText.circle][turn - 1];
	}
}
