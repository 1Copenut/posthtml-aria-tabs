/* global window, location, document */

document.addEventListener('DOMContentLoaded', function () {
	var cache = {}, last;

	Array.prototype.forEach.call(document.querySelectorAll('[role="tablist"]'), function (tablist) {
		Array.prototype.forEach.call(tablist.querySelectorAll('[href^="#"][role="tab"]'), function (tab, index, tabs) {
			cache[tab.hash] = [tab, document.getElementById(tab.getAttribute('aria-controls'))];

			if (tab.getAttribute('aria-selected') === 'true') {
				last = cache[tab.hash];
			} else {
				tab.setAttribute('tabindex', 0);
			}
		});
	});
	
	function onhashchange() {
		var tab = cache[location.hash];

		if (tab) {
			if (last) {
				last[0].removeAttribute('aria-selected');
				last[0].setAttribute('tabindex', 0);
				last[1].setAttribute('hidden', '');
			}

			tab[0].setAttribute('aria-selected', 'true');
			tab[1].removeAttribute('hidden', '');
			tab[1].setAttribute('tabindex', -1);
			tab[1].focus();

			last = tab;
		}
	}

	window.addEventListener('hashchange', onhashchange);

	onhashchange();
});
