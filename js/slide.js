//holds slide information
function Slide(img, col, sec, til, con) {
	this.img = img
	this.col = col
	this.sec = sec
	this.til = til
	this.con = con

	this.image = img

	this.con = formatString(this.con, '#')
	this.con = formatString(this.con, '_')
	this.con = formatString(this.con, '*')
}

//parses through array of lines (pres) and creates all slides
function createSlides(pres) {
	//list of all possible attributes
	var attributes = ['fro', 'int', 'img', 'col', 'sec', 'til', 'con']

	//attributes to be used to define slide
	var img = '',
			col = '',
			sec = '',
			til = '',
			con = ''

	//manage information retrieval
	var currentKey,
			newKey,
			value,
			atSlides = false,

			pl = pres.length,
			i

	for (i = 0; i < pl; i++) {
		newKey = false

		// Skip comments and empty lines
		if (pres[i].substring(0, 2) === '//' || pres[i].length == 1) continue

		// Start new slide if line starts with '='
		if (pres[i].substring(0, 1) === '=') {

			// Everything that precedes the first '=' isn't a slide
			if (atSlides) {
				var s = new Slide(img, col, sec, til, con)
				slides.push(s)

				//reset title, content, and notes (other values can stay, so as to avoid redundancy)
				til = ''
				con = ''
			} else atSlides = true
			continue
		}

		//go through each attribute and see if line begins with its declaration

		var al = attributes.length,
				j

		for (j = 0; j < al; j++) {
			if (pres[i].substring(0, attributes[j].length + 1) === attributes[j] + ':') {
				//once key has been found, update $currentKey, and get the line's value
				currentKey = attributes[j]
				value = pres[i].substring(currentKey.length + 1, pres[i].length)
				value = value.trim()
				newKey = true
			}
		}

		//if key wasn't found, continue adding to the previously acquired attribute
		if (!newKey) {
			if (pres[i].substring(0, 1) === '+')  value = value + '<p>' + pres[i].substring(1, pres[i].length) + '</p>'
			else if (pres[i].substring(0, 1) === '-') value = value + '<p class="l">' + pres[i].substring(1, pres[i].length) + '</p>'
			else value = value + pres[i]
		}

		//assign value to attribute for slide
		switch (currentKey) {
			case 'img':
				img = value;
				break;

			case 'col':
				col = value;
				break;

			case 'sec':
				sec = value;
				break;

			case 'til':
				til = value;
				break;

			case 'con':
				con = value;
				break;

			case 'fro':
				fro = value;
				break;

			case 'int':
				int = value;
				break;
		}
	}
	//push last slide
	var s = new Slide(img, col, sec, til, con)
	slides.push(s)

	//load first slide
	loadSlide(0)
}
