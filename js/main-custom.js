$(function(){
	//initials
	var isAnimating = false,
	firstLoad = false;

	var itemsMenu = [];

	//cache DOM elements
	var menu = $('nav'),
		mainContent = $('.main'),
		body = $('body');


	menu.on('click', 'a', function(event){
		event.preventDefault();
		var target = $(this),
			//detect which section user has chosen
			sectionTarget = target.data('menu');
		if( !target.parent().hasClass('selected') ) {
			//if user has selected a section different from the one alredy visible - load the new content
			triggerAnimation(sectionTarget, true);
		}

		firstLoad = true;
	});


	//detect the 'popstate' event - e.g. user clicking the back button
  	$(window).on('popstate', function() {
	  	if( firstLoad ) {
		    /*
		    Safari emits a popstate event on page load - check if firstLoad is true before animating
		    if it's false - the page has just been loaded 
		    */
	      	var newPageArray = location.pathname.split('/'),
	        //this is the url of the page to be loaded 
	        newPage = newPageArray[newPageArray.length - 1].replace('.html', '');
	      	if( !isAnimating ) triggerAnimation(newPage,false);
	      	document.title = newPage;

	    }
	    firstLoad = true;
	});

	//start animation
	function triggerAnimation(page,bool) {
		isAnimating =  true;
		page = ( page == '' ) ? 'index' : page;

		//update dashboard
		menu.find('*[data-menu="'+page+'"]').parent().addClass('selected').siblings('.selected').removeClass('selected');
		loadNewContent(page, bool);
	}

	function loadNewContent(newSection,bool){

			//create a new section element and insert it into the DOM
			var section = $('<section class="page-section overflow-hidden '+newSection+'"></section>').appendTo(mainContent);
			
			section.load(newSection+'.html .page-section > *', function(event){
			
				section.prev('.visible').removeClass('visible').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					body.removeClass();
					body.addClass(newSection+'-page');
					resetAfterAnimation(section);	
					section.addClass('visible');
					console.log(newSection);
					posMenu(newSection);

					var url = newSection+'.html';
					if(url!=window.location && bool){
			        //add the new page to the window.history
			        //if the new page was triggered by a 'popstate' event, don't add it
				        window.history.pushState('','A',url);
				        document.title = newSection;

				    }
					
					
				})
			})

	}

	function resetAfterAnimation(newSection) {
		//once the new section animation is over, remove the old section and make the new one scrollable
		newSection.removeClass('overflow-hidden').prev('.page-section').remove();
		isAnimating =  false;
		//reset your loading bar
	}


	//positionate menu
	function posMenu(newSection){
		if(newSection == 'index'){
			var menuH = menu.innerHeight();
			var winH = window.innerHeight;
			$('.fixed').css({'top':winH-menuH});
		}else{
			$('.fixed').css({'top':'0'});

		}
		//$('.side-navigation').
	}



//initializate


})