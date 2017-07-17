// Format string to support styling
function formatString(string, symbol) {

	// Check for bracket mismatches
	if (allStringPositions(string, '[').length != allStringPositions(string, ']').length) {
		window.alert('Uneven number of brackets found in string: \n\n '+ string)
	} else {
		var positions = allStringPositions(string, symbol + '[')

		while (positions.length > 0) {
			//find closing ']'
			let end = string.indexOf(']', positions[0])

			//check if any other '[]' pairs exist within substring, suggesting we haven't found the proper ']'
			//find next ']' until we've found the proper ']'
			while (allStringPositions(string.substring(positions[0], end, '[')).length != allStringPositions(string.substring(positions[0], end), ']').length) {
				end = string.indexOf(']', end + 1)
			}

			//run proper format rule
			let selectString = string.substring(positions[0], end + 1),
					format

			switch (symbol) {
				case '#':
					format = createCustomLink(selectString);
					break;

				case '_':
					format = makeItalic(selectString);
					break;

				case '*':
					format = makeBold(selectString);
					break;
			}

			//replace string with new format
			string = string.replace(selectString, format)

			//find next set to parse
			positions = allStringPositions(string, symbol + '[')
		}
	}

	return string
}

//finds all instances of a substring(needle) in a string(haystack)
function allStringPositions(haystack, needle) {
	let offset = 0,
			all = [],
			pos;

	while ((pos = haystack.indexOf(needle, offset)) !== -1) {
		offset = pos + 1
		all.push(pos)
	}

	return all
}

function makeItalic(string) {
	return '<em>' + cleanString(string) + '</em>'
}

function makeBold(string) {
	return '<b>' + cleanString(string) + '</b>'
}

//takes $string and makes it into custom link with custom $style
function createCustomLink(string) {
	string = cleanString(string)

	let accessor = string.indexOf('>'),
			word = string.substring(0, accessor),
			link = string.substring(accessor + 1, string.length)

	word = word.trim()
	link = link.trim()

	return '<a onclick="loadSlide(' + link + ')" class="intended-link">' + word + '</a>';
}

//removes symbol and [] (first two characters and last character) from string
function cleanString(string) {
	string = string.substring(2)
	string = string.substring(0, string.length - 1)
	return string
}
