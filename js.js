// you can enter your JS here!



(function (){

	var currentPhoto;
	var totalPhotos;

	//Create SlideShow
	createSlider =	function() {
		var  slider = "<div id=photoSlider><div class=wrap/><div class=nav><span class=bar/><span id=prev/><span id=next/><span class=close/>";
		$( 'body' ).prepend(slider);
		var index = $( '.one_photo' ).size();
		totalPhotos = index;
	}
	



	// Navigation

	$(document).on('click', '.one_photo', function(e) {
		e.preventDefault();
		slideShow()
		var index = $( this ).index();
		currentPhoto = index;
		openPhoto(index);
	});

	$(document).on('click', '#next', function(e) {
		e.preventDefault();
		navSlider("next");
	});

	$(document).on('click', '#prev', function(e) {
		e.preventDefault();
		navSlider();
	});

	$(document).on('click', '.close', function(e) {
		e.preventDefault();
		closePhotos()
	});

	$(document).keyup(function(e) {
	  if (e.keyCode == 27) { closePhotos() }   // esc
	  if (e.keyCode == 39) { navSlider("next"); }   // right
	  if (e.keyCode == 37) { navSlider(); }   // left
	});	


	// Generic functions

	navSlider = function(nav) {
		if (nav == "next") {
			if (currentPhoto == (totalPhotos - 1)) {
				currentPhoto = 0;
				openPhoto(currentPhoto,"true");

			} else {
				currentPhoto = currentPhoto + 1 ;
				openPhoto(currentPhoto,"true");
			}
		}
		else {
			if (currentPhoto == 0) {
				currentPhoto = 13;
				openPhoto(currentPhoto,"true");

			} else {
				currentPhoto = currentPhoto -1 ;
				openPhoto(currentPhoto,"true");
			}			
		}
	}



	openPhoto = function(index,nav){
		var url = getPhotoData(index).url;
		var alt = getPhotoData(index).alt;

		if ( nav ) {
			$( '#photoSlider h2' ).html(alt);
			$( "#photoSlider .wrap" ).prepend('<img src='+url+'>');
			$( "#photoSlider .wrap img" ).last().fadeOut(200, function() {
				$(this).remove();
			});;
		}
		else {
			$( "#photoSlider .wrap" ).prepend('<img src='+url+'><h2>');
			$( '#photoSlider' ).hide().fadeIn(200, function() {
				$( '#photoSlider .wrap' ).css( "top", "5%" );
				$( '#photoSlider h2' ).html(alt);
				$('.nav').delay(500).css( "top", "5%" );
			});			
		}
	}


	closePhotos = function(){
		$( '#photoSlider' ).fadeOut(200, function() {
			console.log("GA Event: User close photoSlider");
			$( this ).hide();
			$( '#photoSlider .wrap' ).css( "top", "-100%" ).empty();
			$('.nav').delay(500).css( "top", "-100%" );
			clearTimeout( slideTimer );
		});
	}



	getPhotoData = function(index){
		var photos = [];

		$( ".photos ul li a" ).each(function( index ) {
			var url = $(this).attr( 'href' );
			var alt = $(this).children().attr( 'alt' );
			photos.push({'url': url,'alt':alt});
		});
		return photos[index];
	}


	slideShow = function() {
		slideTimer = window.setTimeout(
		function() {
			$( "#next" ).trigger( "click" );
			slideShow();
		}, 3000);
	}



    $.ajax({
      dataType: "json",
      url: "js/data.json",
      jsonp: "$callback",
      success: starPage
    });
    

    function starPage( data ) {
      $("#photoTemplate").tmpl(data).appendTo(".photos");
      $("#headerTemplate").tmpl(data).appendTo("header");
      //$("#descriptionTemplate").tmpl(data).appendTo(".description");
      
    }

	
	setTimeout(function(){ createSlider(); }, 500);


})();







