var info_style_change = function() {
	$('.s-lg-content-more-info').each(function(index, value) { 
		$(value).attr("style","display:block");
		$(value).addClass("well");
	});
	$('.s-lg-label-more-info').hide();
}

// The BS5 preview gate must be exact because non-bs5 pages share this bundle.
// A regex would be smaller, but it would make query parsing rules implicit in
// the pattern. URLSearchParams would express the intent best, but this legacy
// build target adds extra core-js polyfill code for it. This helper is the
// middle ground: parse actual query parameters explicitly while keeping the
// preview-only gate lightweight.
function decodeQueryValue(value) {
	try {
		return decodeURIComponent(value.split("+").join(" "));
	} catch (error) {
		return value;
	}
}

function getQueryParameterValue(name) {
	const queryString = window.location.search.charAt(0) === "?"
		? window.location.search.slice(1)
		: window.location.search;

	if (!queryString) {
		return null;
	}

	const parameters = queryString.split("&");

	for (let index = 0; index < parameters.length; index += 1) {
		const parameter = parameters[index];
		const separatorIndex = parameter.indexOf("=");
		const parameterName = separatorIndex === -1 ? parameter : parameter.slice(0, separatorIndex);
		const parameterValue = separatorIndex === -1 ? "" : parameter.slice(separatorIndex + 1);

		if (decodeQueryValue(parameterName) === name) {
			return decodeQueryValue(parameterValue);
		}
	}

	return null;
}

const isBootstrap5Preview = getQueryParameterValue("bs5") === "1";

if (isBootstrap5Preview) {
	document.documentElement.classList.add("s-lg-bs5-preview");
}

function syncBootstrap5TabAttributes() {
	document.querySelectorAll('[data-toggle="tab"]').forEach(function(tab) {
		if (!tab.hasAttribute("data-bs-toggle")) {
			tab.setAttribute("data-bs-toggle", "tab");
		}
	});
}

// This is inherited jQuery, it needs to be reviewed and possibly eliminated
$(document).ready(function() {
	if (isBootstrap5Preview) {
		document.body.classList.add("s-lg-bs5-preview");
		syncBootstrap5TabAttributes();
	}

	//Changing By Owner to By Author
	// $('#s-lg-index-owner-btn').find('a').html("BY AUTHOR");
	//Changing By Group to By Campus Location
	// $('#s-lg-index-group-btn').find('a').html("BY CAMPUS LOCATION");  
	//Changing Text of Search Button
	// $('.btn-default').html("Search");  
	//Removing default Search text
	// $('form.form-inline.pull-right').find('span').html("");  
	$('#ask-a-librarian').after("<div><a target='_blank' href='http://library.nyu.edu/forms/research/consultations.html'><button id='research-btn'><b>Schedule Research Consultation</b></button></a></div>");
	if(document.getElementById("s-lg-guide-search")) {
		//Changing Placeholder of Search Guides Box
		document.getElementById("s-lg-guide-search").setAttribute("placeholder","Search guides");  
	}

	info_style_change();

    // Replacement for DOMNodeInserted using MutationObserver based on https://developer.chrome.com/blog/mutation-events-deprecation
    const target = document.querySelector('#s-lg-az-content');
    if (target) {
        const observer = new MutationObserver(mutationList => {
            mutationList.filter(m => m.type === 'childList').forEach(m => {
                m.addedNodes.forEach(() => {
                    info_style_change();
                });
            });
        });

        observer.observe(target, { childList: true, subtree: true });
    }
	// if(document.getElementById("s-lg-guide-search-terms")) {
	// 	//Changing Placeholder of Guides Page Search Box
	// 	document.getElementById("s-lg-guide-search-terms").setAttribute("placeholder","enter your search here");  
	// }
});

function ebscoPreProcess(myForm) {
	myForm.bquery.value = myForm.uquery.value;
}
window.ebscoPreProcess = ebscoPreProcess;

// Load NYU Perstare fonts
function loadNYUPerstareFonts() {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(`
        @font-face {
            font-family: 'NYUPerstare';
            src: url('https://webstatic.nyu.edu/fonts/NYUPerstare-VF.woff2') format('woff2');
            font-style: normal;
            font-synthesis: none;
        }
        @font-face {
            font-family: 'NYUPerstareItalic';
            src: url('https://webstatic.nyu.edu/fonts/NYUPerstare-Italic-VF.woff2') format('woff2');
            font-style: italic;
            font-synthesis: none;
        }
        @font-face {
            font-family: 'NYUPerstareCondensed';
            src: url('https://webstatic.nyu.edu/fonts/NYUPerstareCondensed-VF.woff2') format('woff2');
            font-style: normal;
            font-synthesis: none;
        }
        @font-face {
            font-family: 'NYUPerstareCondensedItalic';
            src: url('https://webstatic.nyu.edu/fonts/NYUPerstareCondensed-Italic-VF.woff2') format('woff2');
            font-style: italic;
            font-synthesis: none;
        }
    `));
    document.head.appendChild(style);
}

loadNYUPerstareFonts();

