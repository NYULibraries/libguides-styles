var info_style_change = function() {
	$('.s-lg-content-more-info').each(function(index, value) { 
		$(value).attr("style","display:block");
		$(value).addClass("well");
	});
	$('.s-lg-label-more-info').hide();
}

// Page instrumented such that style changes occur when AZ content
// is inserted onto the page:
$(document).on('DOMNodeInserted', '#s-lg-az-content', function () {
	info_style_change();
});

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
    This script is designed to automatically unhide 'Additional Info' by default on an individual database 
    webpage as soon as it is added to the DOM. The 'Additional Info' button is part of a collapsible
    section that reveals more content when clicked. The script uses a MutationObserver
    to detect when the button is inserted into the DOM. Once detected, it clicks the button to
    expand the 'Additional Info' section, allowing users to see the extra content automatically.
    After the button is clicked, the observer is disconnected to optimize performance.
*/
(function() {
    const script= document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
    document.addEventListener('DOMContentLoaded', function() {
        
        function handleButtonClick(toggleButton) {
            if (toggleButton && toggleButton.getAttribute('aria-expanded') === 'false') {
                toggleButton.click();
                observer.disconnect();
            }
        }

        const callback = ( mutations, observer ) => {
            for ( const mutation of mutations ) {
                if ( mutation.type === 'childList' ) {
                    for ( let i = 0; i < mutation.addedNodes.length; i++ ) {
                        let node = mutation.addedNodes[i];
                        if ( node.nodeType === 1 ) {
                            let toggleButton = node.matches(buttonSelector) ? node : node.querySelector(buttonSelector);

                            if ( toggleButton ) {
                                handleButtonClick( toggleButton );
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
