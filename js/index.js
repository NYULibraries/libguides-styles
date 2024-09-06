var info_style_change = function() {
	$('.s-lg-content-more-info').each(function(index, value) { 
		$(value).attr("style","display:block");
		$(value).addClass("well");
	});
	$('.s-lg-label-more-info').hide();
}

// This is inherited jQuery, it needs to be reviewed and possibly eliminated
$(document).ready(function() {
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

/*
    This script is designed to automatically expand all 'Additional Info' sections as soon as they 
    are added to the DOM. Each 'Additional Info' section is controlled by a collapsible button 
    that toggles the visibility of additional content when clicked. The script leverages a MutationObserver 
    to monitor the DOM for the insertion of these buttons. Once a button is detected, the script 
    checks its state and clicks it if it is in the "collapsed" state (i.e., `aria-expanded` is set to 'false'), 
    ensuring that the 'Additional Info' sections are expanded by default.
    The script is capable of handling scenarios with one or multiple buttons. It selects all matching buttons 
    within each newly added node and clicks each one that needs to be expanded.
*/
(function() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
    document.addEventListener('DOMContentLoaded', function() {

        function handleButtonClick( toggleButtons ) {
            toggleButtons.forEach(button => {
                if (button.getAttribute('aria-expanded') === 'false') {
                    button.click();
                }
            });
        }

        const callback = ( mutations, observer ) => {
            for ( const mutation of mutations ) {
                if ( mutation.type === 'childList' ) {
                    for ( let i = 0; i < mutation.addedNodes.length; i++ ) {
                        let node = mutation.addedNodes[i];
                        if ( node.nodeType === 1 ) {
                            let toggleButtons = node.matches(buttonSelector) 
                                ? [node] 
                                : Array.from(node.querySelectorAll(buttonSelector));

                            if ( toggleButtons.length > 0) {
                                handleButtonClick( toggleButtons );
                                observer.disconnect();
                                return;
                            }
                        }
                    }
                }
            }
        };

        const buttonSelector = 'button.collapsible.az-toggle';
        const observer = new MutationObserver(callback);
        const observerConfig = { childList: true, subtree: true };

        observer.observe(document.body, observerConfig);
    });
    `;
    document.head.appendChild(script);
})();
