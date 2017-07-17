var slides = [], //holds all slides
		slideNum, //determines current slide
		presentation = [] //array of all lines in presentation file

//colors
var fro,
		int;

//loads relevant presentation information
function loadSlide(n) {
	slideNum = n
	loadContent()
	updatePercentage(slideNum, slides.length - 1)
	loadTheme()
}

//loads and renders content
function loadContent() {
	currentSlide = slides[slideNum]

	//clear old slide elements
	let content = document.getElementById('content')

	while (content.firstChild)
		content.removeChild(content.firstChild)

	//background
	content.style.backgroundColor = currentSlide.img

	//title
	let title = document.createElement('div')

	title.insertAdjacentHTML('afterbegin', currentSlide.til)
	title.style.color = currentSlide.col

	content.appendChild(title)

	//content
	let slideContent = document.createElement('span')

	slideContent.insertAdjacentHTML('afterbegin', currentSlide.con)
	slideContent.style.color = currentSlide.col
	slideContent.className = 'content-text'

	content.appendChild(slideContent)
}

//loads custom color scheme
function loadTheme() {
	if (fro) {
		addStyle('<style>#count {background-color:' + fro + ';}</style>')
		addStyle('<style>::moz-selection {color:' + fro + ';}</style>')
		addStyle('<style>::selection {color:' + fro + ';}</style>')
		addStyle('<style>.bar-select {color: ' + fro + ';}</style>')
	}

	if (int)
		addStyle('<style>body {color:' + int + ';}</style>')
}

//add style into html
function addStyle(style) {
	let content = document.getElementById('content')
	content.insertAdjacentHTML('afterbegin', style)
}

//used to escape closure issue when creating sidebar links
// function makeOnClickCallback(i) {
// 	return function() {
// 		loadSlide(i);
// 		return false;
// 	};
// }
