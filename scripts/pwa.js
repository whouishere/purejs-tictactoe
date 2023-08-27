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

/** @type { HTMLSpanElement } */
let installBttn = document.getElementById("install-button");

window.addEventListener("beforeinstallprompt", (e) => {
	e.preventDefault();
	window.deferredPrompt = e;
	
	installBttn.removeAttribute("hidden");
});

/**
 * @typedef BeforeInstallPromptEvent
 * @property { readonly Array<string> } platforms
 * @property { readonly Promise<{
 * 	outcome: 'accepted' | 'dismissed', 
 * 	platform: string
 * }> } userChoice
 * @property { () => Promise<void> } prompt
*/

installBttn.addEventListener("click", async () => {
	/** @type { BeforeInstallPromptEvent } */
	const promptEvent = window.deferredPrompt;
	if (!promptEvent) {
		return;
	}
	await promptEvent.prompt();

	window.deferredPrompt = null;
	installBttn.setAttribute("hidden", "");
});
