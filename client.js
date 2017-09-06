/* global window, location, document, define, module, require */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define([''], factory);
	} else if (typeof exports === 'object') {
		// Node, CommonJS-like
		module.exports = factory(require(''));
	} else {
		// Browser globals (root is window)
		root.returnsExports = factory();
	}
}(this, function () {
	// Methods
	function prepareTabs () {
		var cache = {}, last;

		document.addEventListener('DOMContentLoaded', function () {			
			Array.prototype.forEach.call(document.querySelectorAll('[class="tablist"]'), function (tablist) {
				Array.prototype.forEach.call(tablist.querySelectorAll('[href^="#"][class*="tab"]'), function (tab, index, tabs) {
					cache[tab.hash] = [tab, document.getElementById(tab.getAttribute('aria-controls'))];

					if (tab.classList.contains('selected') === true) {
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
						last[0].classList.remove('selected');
						last[0].setAttribute('tabindex', 0);
						last[1].setAttribute('aria-hidden', 'true');
					}

					tab[0].classList.add('selected');
					tab[1].removeAttribute('aria-hidden');
					tab[1].children[0].setAttribute('tabindex', -1);
					tab[1].children[0].focus();

					last = tab;
				}
			}

			window.addEventListener('hashchange', onhashchange);

			onhashchange();
		});
	}

	// Exposed public methods
	return {
		prepareTabs: prepareTabs()
	};
}));
