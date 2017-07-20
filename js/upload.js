//set up drop zone listeners
var dropZone = document.getElementById('drop')

dropZone.addEventListener('dragover', handleDragOver, false)
dropZone.addEventListener('drop', handleFileSelect, false)

//drop handler
function handleFileSelect(evt) {
	evt.stopPropagation()
	evt.preventDefault()

	let file = evt.dataTransfer.files[0],
			reader = new FileReader()

	reader.onload = function(progressEvent){
		let lines = this.result.split('\n'),
				ll = lines.length,
				l

		for (l = 0; l < ll; l++) {
      Texte.lif.push(lines[l])
    }

		dropZone.parentNode.removeChild(dropZone)
		Texte.page.createPages(Texte.lif)
	}

	reader.readAsText(file)
}

//on drag over
function handleDragOver(evt) {
	evt.stopPropagation()
	evt.preventDefault()
}
