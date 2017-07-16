//holds all slides
var slides = [];

//determines current slide
var slideNum;

//array of all lines in presentation file
var presentation = [];

//colors
var fro;
var int;

//loads relevant presentation information
function loadSlide(n) {
	//update slideNum number
	slideNum = n;

	//load content
	loadContent();

	//update stats
	updatePercentage(slideNum, slides.length - 1);

	//load custom interface theme
	loadTheme();
}

//loads and renders content
function loadContent() {
	currentSlide = slides[slideNum];

	//clear old slide elements
	var content = document.getElementById('content');

	while (content.firstChild) {
		content.removeChild(content.firstChild);
	}

	//background
	content.style.backgroundColor = currentSlide.img;

	//title
	var title = document.createElement('div');

	title.insertAdjacentHTML('afterbegin', currentSlide.til);
	title.style.color = currentSlide.col;

	content.appendChild(title);

	//content
	var slideContent = document.createElement('span');

	slideContent.insertAdjacentHTML('afterbegin', currentSlide.con);
	slideContent.style.color = currentSlide.col;
	slideContent.className = 'content-text';

	content.appendChild(slideContent);
}

//loads custom color scheme
function loadTheme() {
	if (fro) {
		addStyle('<style>#count {background-color:' + fro + ';}</style>');
		addStyle('<style>::moz-selection {color:' + fro + ';}</style>');
		addStyle('<style>::selection {color:' + fro + ';}</style>');
		addStyle('<style>.bar-select {color: ' + fro + ';}</style>');
	}

	if (int) {
		addStyle('<style>body {color:' + int + ';}</style>');
	}
}

//add style into html
function addStyle(style) {
	var content = document.getElementById('content');
	content.insertAdjacentHTML('afterbegin', style);
}

//used to escape closure issue when creating sidebar links
function makeOnClickCallback(i) {
	return function() {
		loadSlide(i);
		return false;
	};
}
