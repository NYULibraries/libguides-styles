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

function appendChatWidget() {
    const CHATWIDGET_EMBED_CSS_URL = 'https://cdn.library.nyu.edu/chatwidget-embed/index.min.css';
    const CHATWIDGET_EMBED_PROD_URL = 'https://cdn.library.nyu.edu/chatwidget-embed/index.min.js';

    if (!document.querySelector('link[href="' + CHATWIDGET_EMBED_CSS_URL + '"]')) {
        const linkTag = document.createElement('link');
        linkTag.rel = 'stylesheet';
        linkTag.href = CHATWIDGET_EMBED_CSS_URL;
        document.head.appendChild(linkTag);
    }

    if (!document.querySelector('script[src="' + CHATWIDGET_EMBED_PROD_URL + '"]')) {
        const scriptTag = document.createElement('script');
        scriptTag.src = CHATWIDGET_EMBED_PROD_URL;
        document.head.appendChild(scriptTag);
    }
}

appendChatWidget();

function loadSSNYULibrariesFont() {
    const style = document.createElement("style");
    const cssRule = `
    @font-face {
        font-family: "SS NYULibraries";
        src: url("https://library.nyu.edu/assets/fonts/ss-nyu-libraries.eot");
        src: url("https://library.nyu.edu/assets/fonts/ss-nyu-libraries.eot?#iefix") format("embedded-opentype"),
            url("https://library.nyu.edu/assets/fonts/ss-nyu-libraries.woff") format("woff"),
            url("https://library.nyu.edu/assets/fonts/ss-nyu-libraries.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
    }
    `;

    if (style.styleSheet) {
    style.styleSheet.cssText = cssRule;
    } else {
    style.appendChild(document.createTextNode(cssRule));
    }

    document.head.appendChild(style);
}

loadSSNYULibrariesFont();

/* Uncomment to run the script locally */
// document.addEventListener("DOMContentLoaded", function () {
//     function updateFooter() {
//     function createNewFooter() {
//         const footer = document.createElement("footer");
//         footer.id = "footer";
//         footer.className = "primary-footer";
//         footer.setAttribute("data-swiftype-index", "false");
//         footer.innerHTML = `
//         <div class="wrap">
//             <div class="block-container">
//             <div class="block block--25 footer__give">
//                 <form class="footer__search">
//                 <label class="sr-only" for="f_footer__search__field">  search this site </label>
//                 <input id="f_footer__search__field" type="text" class="footer__search__field st-default-search-input" name="q" placeholder="  search this site " autocomplete="off" autocorrect="off" autocapitalize="off">
//                 <input type="submit" class="footer__search__button ss-icon" value="&#x1F50D;" >
//                 </form>

//                 <a class="button" href="https://library.nyu.edu/giving/">Give to the Libraries</a>
//             </div>

//             <div class="block block--25 footer__menu">
//                 <ul class="list">
//                 <li class="menu__li menu__li--login-to-nyu-home">
//                     <a href="https://home.nyu.edu" class="menu__link menu__link--login-to-nyu-home" target="_blank">
//                     Login to NYU Home
//                     </a>
//                 </li>
//                 <li class="menu__li menu__li--departments">
//                     <a href="https://library.nyu.edu/departments/" class="menu__link menu__link--departments">
//                     Departments
//                     </a>
//                 </li>
//                 <li class="menu__li menu__li--staff-wiki">
//                     <a href="https://wiki.library.nyu.edu/" class="menu__link menu__link--staff-wiki" target="_blank">
//                     Staff Wiki
//                     </a>
//                 </li>
//                 <li class="menu__li menu__li--staff-directory">
//                     <a href="https://library.nyu.edu/people/" class="menu__link menu__link--staff-directory">
//                     Staff Directory
//                     </a>
//                 </li>
//                 <li class="menu__li menu__li--status-page">
//                     <a href="https://nyulibraries.statuspage.io" class="menu__link menu__link--status-page" target="_blank">
//                     Status Page
//                     </a>
//                 </li>
//                 </ul>
//                     </div>
//                     <div class="block block--25 footer__menu">
//                 <ul class="list">
//                 <li class="menu__li menu__li--research-guides">
//                     <a href="https://guides.nyu.edu/" class="menu__link menu__link--research-guides" target="_blank">
//                     Research Guides
//                     </a>
//                 </li>
//                 <li class="menu__li menu__li--faqs">
//                     <a href="http://library.answers.nyu.edu" class="menu__link menu__link--faqs" target="_blank">
//                     FAQs
//                     </a>
//                 </li>
//                 <li class="menu__li menu__li--career-opportunities">
//                     <a href="https://library.nyu.edu/about/our-team/career-opportunities/" class="menu__link menu__link--career-opportunities">
//                     Career Opportunities
//                     </a>
//                 </li>
//                 <li class="menu__li menu__li--contact-us">
//                     <a href="https://library.nyu.edu/contact/" class="menu__link menu__link--contact-us">
//                     Contact Us
//                     </a>
//                 </li>
//                 <li class="menu__li menu__li--accessibility">
//                     <a href="https://www.nyu.edu/footer/accessibility.html" class="menu__link menu__link--accessibility" target="_blank">
//                     Accessibility
//                     </a>
//                 </li>
//                 </ul>
//             </div> <!-- block block--25 footer__menu -->
//             <div class="block block--25 footer__social">
//                 <p>
//                 Find out about upcoming programs, events, and resources.<br>
//                 <a class="ss-navigateright right" href="https://bit.ly/nyu-liblink">Subscribe to our email list</a>
//                 </p>
//                 <a href="https://www.facebook.com/nyulibraries" class="ss-icon" target="_blank" aria-label="NYU Libraries Facebook">&#xF610;</a>
//                 <a href="https://www.instagram.com/nyulibraries" class="ss-icon" target="_blank" aria-label="NYU Libraries Instagram">&#xF641;</a>
//                 <a href="https://www.linkedin.com/company/nyu-libraries" class="ss-icon" target="_blank" aria-label="NYU Libraries LinkedIn">&#xF612;</a>
//             </div>
//             </div> <!-- block-container -->
//             <div class="footer__copyright">
//             Unless otherwise noted, all content copyright New York University. All rights reserved.
//             <a href="https://library.nyu.edu/privacy-policy/">Privacy policy</a>

//             <a class="footer__logo" href="https://www.nyu.edu">
//                 <img src="/assets/images/nyu-footer-logo.svg" alt="New York University homepage." height="27">
//             </a>
//             </div> 
//         </div>  <!-- wrap   -->
//         `;
//         return footer;
//     }

//     function replaceFooter() {
//         const oldFooter = document.querySelector(".public-footer-container");
//         if (oldFooter) {
//         const newFooter = createNewFooter();
//         oldFooter.parentNode.replaceChild(newFooter, oldFooter);
//         console.log("Footer replaced successfully");
//         } else {
//         console.log("Footer container not found");
//         }
//     }

//     const observer = new MutationObserver((mutationsList, observer) => {
//         for (const mutation of mutationsList) {
//         console.log("DOM change detected"); 
//         if (mutation.type === "childList" && document.querySelector(".public-footer-container")) {
//             replaceFooter();
//             observer.disconnect();
//             break;
//         }
//         }
//     });

//     if (document.body) {
//         observer.observe(document.body, { childList: true, subtree: true });
//     } else {
//         console.error("document.body is null. Observer cannot start.");
//     }
//     }

//     updateFooter();
// });



