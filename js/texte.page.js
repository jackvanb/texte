/*

  Pages

*/

"use strict";

function Page(id, bg, col, sec, til, con) {
	this.id = id
	this.bg = bg

	this.col = col
	this.sec = sec
	this.til = til
	this.con = con

	this.con = Texte.page.formatString(this.con, '#')
	this.con = Texte.page.formatString(this.con, '_')
	this.con = Texte.page.formatString(this.con, '*')
}

Texte = window.Texte || {}
Texte.page = {

	// Parses through array of lines and creates Pages
	createPages(fil) {
		let att = ["id", "bg", "col", "sec", "til", "con"],

			// Attributes to be used to define Page
			id = '',
			bg = '',
			col = '',
			sec = '',
			til = '',
			con = '',

			// Manage information retrieval
			crk, // current key
			nky, // new key
			val, // value
			atp = false, // at Pages

			for (let i = 0, pl = fil.length; i < pl; i++) {
				nky = false

				// Skip comments and empty lines
				if (fil[i].substring(0, 2) === '//' || fil[i].length == 1) continue

				// Start new Page if line starts with '='
				if (fil[i].substring(0, 1) === '$') {
					// Everything that precedes the first '=' isn't a slide
					if (atp) {
						Texte.sto.push(new Page(id, bg, col, sec, til, con))

						// Texte.sto[]

						// Reset title and content (other values can stay, so as to avoid redundancy)
						til = ''
						con = ''
					} else atp = true
					continue
				}

				// Go through each attribute and see if line begins with its declaration
				for (let j = 0, al = att.length; j < al; j++) {
					// Key found, get line's value
					if (fil[i].substring(0, att[j].length + 1) === att[j] + ':') {
						crk = att[j]
						val = fil[i].substring(crk.length + 1, fil[i].length)
						val = val.trim()
						nky = true
					}
				}

				// If key wasn't found, continue adding to the previously acquired attribute
				if (!nky) {
					if (fil[i].substring(0, 1) === '+')
						val = val + '<p>' + fil[i].substring(1, fil[i].length) + '</p>'
					else if (fil[i].substring(0, 1) === '-')
						val = val + '<p class="l">' + fil[i].substring(1, fil[i].length) + '</p>'
					else
						val = val + fil[i]
				}

				// Assign value to attribute
				switch (crk) {
					case "id":
						id = val;
						break;
					case 'bg':
						bg = val;
						break;
					case 'col':
						col = val;
						break;
					case 'sec':
						sec = val;
						break;
					case 'til':
						til = val;
						break;
					case 'con':
						con = val;
						break;
						// case 'fro':
						// 	fro = val;
						// 	break;
						// case 'int':
						// 	int = val;
						// 	break;
				}
			}

		// Push last slide
		Texte.sto.push(new Page(id, bg, col, sec, til, con))

		// Load first slide
		Texte.loadPage(0)
	},

	formatString: function(str, sym) {
		// Check for bracket mismatches
		if (Texte.page.allStringPositions(str, '[').length != Texte.page.allStringPositions(str, ']').length) {
			window.alert('Uneven number of brackets found in string: \n\n ' + str)
		} else {
			let pos = Texte.page.allStringPositions(str, sym + '[')

			while (pos.length > 0) {
				// Find closing ']'
				let end = str.indexOf(']', pos[0])

				// Check if any other '[]' pairs exist within substring, suggesting we haven't found the proper ']'
				// Find next ']' until we've found the proper ']'
				while (Texte.page.allStringPositions(str.substring(pos[0], end, '[')).length != Texte.page.allStringPositions(str.substring(pos[0], end), ']').length) {
					end = str.indexOf(']', end + 1)
				}

				// Run proper format rule
				let sls = str.substring(pos[0], end + 1), // select string
					frm // format

				switch (sym) {
					case '#':
						frm = Texte.page.createCustomLink(sls);
						break;
					case '_':
						frm = Texte.page.makeItalic(sls);
						break;
					case '*':
						frm = Texte.page.makeBold(sls);
						break;
				}

				// Replace string with new format
				str = str.replace(sls, frm)

				// Find next set to parse
				pos = Texte.page.allStringPositions(str, sym + '[')
			}
		}

		return str
	},

	// Finds all instances of a substring(needle) in a string(haystack)
	allStringPositions: function(hay, ndl) {
		let off = 0, // offset
			all = [],
			pos

		while ((pos = hay.indexOf(ndl, off)) !== -1) {
			off = pos + 1
			all.push(pos)
		}

		return all
	},

	makeItalic: function(s) {
		return '<em>' + Texte.page.clean(s) + '</em>'
	},

	makeBold: function(s) {
		return '<b>' + Texte.page.clean(s) + '</b>'
	},

	// Takes $string and makes it into custom link with custom $style
	createCustomLink: function(s) {
		s = Texte.page.clean(s)

		let acs = s.indexOf('>'), // accessor
			wrd = s.substring(0, acs), // word
			lnk = s.substring(acs + 1, s.length) // link

		wrd = wrd.trim()
		lnk = lnk.trim()

		return '<a onclick="Texte.loadPage(' + lnk + ')">' + wrd + '</a>'
	},

	// Removes symbol and [] from string
	clean: function(s) {
		s = s.substring(2)
		s = s.substring(0, s.length - 1)
		return s
	}
}