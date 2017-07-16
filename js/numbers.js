//updates percentage
function updatePercentage(currentNum, allNum) {
	var percentage = (currentNum / allNum) * 100

	percentage = percentage.toFixed(2)
	if (percentage < 10)
		percentage = formatNum(percentage)

	document.getElementById('percent').innerHTML = percentage + '%'

	function formatNum(num) {
		return "0" + num
	}
}
