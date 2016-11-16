var ifrm= $('#pagecontainer>#page').get(0);

ifrm.onload = function() {   
	$(this).fadeIn("slow");
	$("#loader").fadeOut("slow");
};


$('a.open-overlay').click(function (e) {
    e.preventDefault();
    var src = $(this).attr('href');

    $("#loader").css("display", "inline");
    $("#loader").css("background", "none");
    
    $("#overlay").slideDown('normal', function () {
       
       	$('#pagecontainer').slideDown('normal');
       	$('#pagecontainer>#page').attr('src', src);
       	document.body.classList.toggle('noscroll', true);
    });
});

$('#overlay').click(function () {
    $('#overlay,#pagecontainer,#page').hide();
    document.body.classList.toggle('noscroll', false);
});

// $('#pagecontainer>#close').click(function (e) {
//     $('#overlay').click();
// });