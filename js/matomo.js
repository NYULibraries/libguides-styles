// Matomo analytics for guides.nyu.edu (Matomo site 4). This used to be pasted
// into the LibGuides admin; keeping it here puts it in git and deploys it with
// index.min.js.
function loadMatomo() {
	// Skip the local dev proxy (localhost:8080) and any other host.
	if (window.location.hostname !== 'guides.nyu.edu') {
		return;
	}
	// If the Matomo snippet is also pasted in the LibGuides admin, it has already
	// set up _paq (Matomo's command queue) in the head. Don't count the page view
	// twice. About _paq:
	// https://developer.matomo.org/guides/tracking-javascript-guide#finding-the-matomo-tracking-code
	if (window._paq) {
		return;
	}

	// Matomo's tracking code, unchanged from the LibGuides admin box.
	var _paq = window._paq = window._paq || [];
	/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
	_paq.push(['trackPageView']);
	_paq.push(['enableLinkTracking']);
	(function () {
		var u = "https://nyulib.matomo.cloud/";
		_paq.push(['setTrackerUrl', u + 'matomo.php']);
		_paq.push(['setSiteId', '4']);
		var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
		g.async = true; g.src = '//cdn.matomo.cloud/nyulib.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g, s);
	})();
}

// index.min.js loads in the head, before the admin snippet, so wait until the
// head has run before checking for _paq.
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
export function initMatomo() {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', loadMatomo);
	} else {
		loadMatomo();
	}
}
