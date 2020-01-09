// This is inherited jQuery, it needs to be reviewed and possibly eliminated
$(document).ready(function() {
	//Changing By Owner to By Author
	$('#s-lg-index-owner-btn').find('a').html("BY AUTHOR");
	//Changing By Group to By Campus Location
	$('#s-lg-index-group-btn').find('a').html("BY CAMPUS LOCATION");  
	//Changing Text of Search Button
	$('.btn-default').html("Search");  
	//Removing default Search text
	$('form.form-inline.pull-right').find('span').html("");  
	$('#ask-a-librarian').after("<div><a target='_blank' href='http://library.nyu.edu/forms/research/consultations.html'><button id='research-btn'><b>Schedule Research Consultation</b></button></a></div>");
	if(document.getElementById("s-lg-guide-search")) {
		//Changing Placeholder of Search Guides Box
		document.getElementById("s-lg-guide-search").setAttribute("placeholder","search subject guides");  
	}
	if(document.getElementById("s-lg-guide-search-terms")) {
		//Changing Placeholder of Guides Page Search Box
		document.getElementById("s-lg-guide-search-terms").setAttribute("placeholder","enter your search here");  
	}
});
