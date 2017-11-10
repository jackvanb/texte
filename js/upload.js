//set up drop zone listeners
var dropZone = document.getElementById('drop')

dropZone.addEventListener('dragover', handleDragOver, false)
dropZone.addEventListener('drop', handleFileSelect, false)

//drop handler
function handleFileSelect(evt) {
  evt.stopPropagation()
  evt.preventDefault()

  let file = evt.dataTransfer.files[0]
  let reader = new FileReader()

  reader.onload = function(progressEvent) {
    let lines = this.result.split('\n')

    for (let l = 0, ll = lines.length; l < ll; l++) {
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
