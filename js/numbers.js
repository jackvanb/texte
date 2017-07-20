//updates percentage
function updatePercentage(currentNum, allNum) {
	let per = (currentNum / allNum) * 100

	per = per.toFixed(2)
	if (per < 10) per = "0" + per

	document.getElementById('percent').innerHTML = per + '%'
}
