// to be used for development

//track keyboard input
window.onload = function(){
	document.onkeypress = function(e){
		key = code(e)

		//.
		if (key == 44 && slideNum > 0)
			loadSlide(slideNum - 1)

		//,
		if (key == 46 && slideNum < slides.length - 1)
			loadSlide(slideNum + 1)
	}
}

//get keycode
function code(e) {
	e = e || window.event
	return(e.keyCode || e.which)
}
